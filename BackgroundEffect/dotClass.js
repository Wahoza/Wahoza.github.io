import * as THREE from "three";

const dotSettings = {
    distanceAffection : 10.0,
    avoidanceFactor: 20.0,
    planeEffector: 0.4,
    planeDodgeHeightFactor: 5.0,
    planeDistanceEffector: 2.0
}



export class Dot{
    constructor(size, dotId, pivot, dotColor){
        let dotMaterial = new THREE.MeshBasicMaterial({color: dotColor});

        this.mesh = new THREE.Mesh(new THREE.BoxGeometry(size,size,size), dotMaterial);
        this.isAvoidingMouse = false;
        this.isAvoidingPlane = false;
        this.lastIsAvoidingPlane = false;
        this.lastIsAvoidingMouse = false;

        this.lerpFactor = 0.0;
        this.lerpPivotFactor = 0.0;
        this.velocityX = 0;
        this.velocityY = 0;
        this.lerpSpeed = 0.005;
        this.lerpPivotSpeed = 0.007;
        
        this.mouseDodgeTargetPos = new THREE.Vector3(); 
        this.planeDodgeTargetPos = new THREE.Vector3();

        this.targetPos = new THREE.Vector3();

        this.id = dotId;
        this.mainPivot = pivot;
    }
    
    setSphereData(circlePivot)
    {
        this.spherePivot = circlePivot;
    }

    setSquareData(squarePivot)
    {
        this.squarePivot = squarePivot;
    }

    avoidMouse(mousePos, cameraDir ){
        let dotGlobalPos = new THREE.Vector3();

        let dodgePos = new THREE.Vector3(0,0,0);
         
        this.mesh.getWorldPosition(dotGlobalPos);


        let A = cameraDir;
        let C = dotGlobalPos;
        let B = new THREE.Vector3(0,0,0);
        let AC = new THREE.Vector3();
        AC.x = C.x - A.x;
        AC.y = C.y - A.y;
        AC.z = C.z - A.z;
                
        let AB = new THREE.Vector3();
        AB.x = B.x - A.x;
        AB.y = B.y - A.y;
        AB.z = B.y - A.z;

        let distanceOfCameraPlane = AC.dot(AB)/AB.dot(AB);
        
        let cameraPlane = new THREE.Plane(cameraDir, distanceOfCameraPlane);
        cameraPlane.projectPoint(mousePos, dodgePos);

        let distance = dotGlobalPos.distanceTo(dodgePos);
        if(distance < dotSettings.distanceAffection){
            let dir = new THREE.Vector3();
            
            dir = new THREE.Vector3(dotGlobalPos.x-dodgePos.x, dotGlobalPos.y-dodgePos.y, dotGlobalPos.z-dodgePos.z);
            
            dir.normalize()
            this.mouseDodgeTargetPos.x = dir.x * (dotSettings.planeDodgeHeightFactor);
            this.mouseDodgeTargetPos.y = dir.y * (dotSettings.planeDodgeHeightFactor);
            this.mouseDodgeTargetPos.z = dir.z * (dotSettings.planeDodgeHeightFactor);

            if(!this.isAvoidingMouse){
                this.isAvoidingMouse = true;
            }
        }
         
        else{
            if(this.isAvoidingMouse){
                this.isAvoidingMouse = false;
            }
            this.mouseDodgeTargetPos.copy(new THREE.Vector3());
        }
    }

    avoidPlane(plane){
        let dotGlobalPos = new THREE.Vector3();

        let dodgePos = new THREE.Vector3(0,0,0);
         
        this.mesh.getWorldPosition(dotGlobalPos);

        plane.projectPoint(dotGlobalPos, dodgePos);

        let distance = dotGlobalPos.distanceTo(dodgePos);
        if(distance < dotSettings.planeDistanceEffector){
            let dir = new THREE.Vector3();
            
            dir = new THREE.Vector3(dotGlobalPos.x-dodgePos.x, dotGlobalPos.y-dodgePos.y, dotGlobalPos.z-dodgePos.z);
            
            dir.normalize()

            this.planeDodgeTargetPos.x = dir.x * (dotSettings.avoidanceFactor);
            this.planeDodgeTargetPos.y = dir.y * (dotSettings.avoidanceFactor);
            this.planeDodgeTargetPos.z = dir.z * (dotSettings.avoidanceFactor);

            if(!this.isAvoidingPlane){
                this.isAvoidingPlane = true;
            }
        }
         
        else{
            if(this.isAvoidingPlane){
                this.isAvoidingPlane = false;
            }
            this.planeDodgeTargetPos.copy(new THREE.Vector3());
        }
    }

    updateTargetPos(){
        if(this.lastIsAvoidingMouse != this.isAvoidingMouse)
            this.lerpFactor = 0.0;


        if(this.lastIsAvoidingPlane != this.isAvoidingPlane)
            this.lerpFactor = 0.0;

        this.lastIsAvoidingMouse = this.isAvoidingMouse;
        this.lastIsAvoidingPlane = this.isAvoidingPlane;

        if(this.isAvoidingMouse && this.isAvoidingPlane){
            this.targetPos = this.mouseDodgeTargetPos.lerp(this.planeDodgeTargetPos, dotSettings.planeEffector)
        }
        else if(this.isAvoidingMouse){
            this.targetPos = this.mouseDodgeTargetPos;
        }
        else if (this.isAvoidingPlane){
            this.targetPos = this.planeDodgeTargetPos;
        }
        else{
            this.targetPos.copy(new THREE.Vector3());
        }
        
    }

    update(deltaTime){

        this.updateTargetPos();

        this.mesh.position.lerp(this.targetPos, this.lerpFactor);
        if(this.lerpFactor < 1.0){
            this.lerpFactor += this.lerpSpeed * deltaTime;
                        
            if(this.lerpFactor > 1.0) this.lerpFactor = 1.0;
        } 
    }

    updateSpherePivots(deltaTime){
        let worldPos = new THREE.Vector3(); 
        this.spherePivot.getWorldPosition(worldPos);
        this.mainPivot.position.lerp(worldPos, this.lerpPivotFactor);

        if(this.lerpPivotFactor < 1.0){
            this.lerpPivotFactor += this.lerpPivotSpeed * deltaTime;
                        
            if(this.lerpPivotFactor > 1.0) this.lerpPivotFactor = 1.0;
        } 
    }

    updateSquarePivots(deltaTime){
        let worldPos = new THREE.Vector3(); 
        this.squarePivot.getWorldPosition(worldPos);
        this.mainPivot.position.lerp(worldPos, this.lerpPivotFactor);

        if(this.lerpPivotFactor < 1.0){
            this.lerpPivotFactor += this.lerpPivotSpeed * deltaTime;
                        
            if(this.lerpPivotFactor > 1.0) this.lerpPivotFactor = 1.0;
        } 
    }
}