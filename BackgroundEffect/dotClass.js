import * as THREE from "three";

const dotSettings = {
    distanceAffection : 10.0,
    avoidanceFactor: 20.0,
}



export class Dot{
    constructor(size, dotId, pivot, dotColor){
        let dotMaterial = new THREE.MeshBasicMaterial({color: dotColor});

        this.mesh = new THREE.Mesh(new THREE.BoxGeometry(size,size,size), dotMaterial);
        this.isAvoiding = false;
        this.lerpFactor = 0.0;
        this.lerpPivotFactor = 0.0;
        this.velocityX = 0;
        this.velocityY = 0;
        this.lerpSpeed = 0.005;
        this.lerpPivotSpeed = 0.007;
        this.isAvoiding = false;
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
            this.targetPos.x = dir.x * (dotSettings.avoidanceFactor);
            this.targetPos.y = dir.y * (dotSettings.avoidanceFactor);
            this.targetPos.z = dir.z * (dotSettings.avoidanceFactor);

            if(!this.isAvoiding){
                this.lerpFactor = 0.0;
                this.isAvoiding = true;
            }
        }
         
        else{
            if(this.isAvoiding){
                this.isAvoiding = false;
                this.lerpFactor = 0.0;
            }
            this.targetPos.copy(new THREE.Vector3());
        }
    }

    update(deltaTime){
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