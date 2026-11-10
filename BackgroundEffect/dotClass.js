import * as THREE from "three";

const dotSettings = {
    distanceAffection : 20.0,
    avoidanceFactor: 30.0,
}



export class Dot{
    constructor(size, dotId, dotColor){
        let dotMaterial = new THREE.MeshBasicMaterial({color: dotColor});

        this.mesh = new THREE.Mesh(new THREE.BoxGeometry(size,size,size), dotMaterial);
        this.isAvoiding = false;
        this.lerpFactor = 0.0;
        this.velocityX = 0;
        this.velocityY = 0;
        this.lerpSpeed = 0.005;
        this.isAvoiding = false;
        this.targetPos = new THREE.Vector3(); 
        this.id = dotId;
    }
    
    setSphereData(radius, circlePivot)
    {
        this.circlePivot = circlePivot;
        this.radius = radius;
    }

    setVerticalScrollingData(pivotOrigin, maxHeight, moveDirection)
    {
        this.moveSpeed = 2 * moveDirection;
        this.scrollingVerticalPivotOrigin = pivotOrigin;
        this.maxVerticalScrollingHeight = maxHeight;
        this.scrollingPivot = new THREE.Vector3(pivotOrigin.x, pivotOrigin.y, pivotOrigin.z);
    }

    avoidMouse(mousePos, cameraDir ){
        let dotGlobalPos = new THREE.Vector3();
        let pivotGlobalPos = new THREE.Vector3();

        let dodgePos = new THREE.Vector3(0,0,0);
         
        this.mesh.getWorldPosition(dotGlobalPos);
        this.circlePivot.getWorldPosition(pivotGlobalPos)


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
            this.targetPos.x = dir.x * (dotSettings.avoidanceFactor - this.radius);
            this.targetPos.y = dir.y * (dotSettings.avoidanceFactor - this.radius);
            this.targetPos.z = dir.z * (dotSettings.avoidanceFactor - this.radius);

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

    updateCircle(deltaTime){
        this.mesh.position.lerp(this.targetPos, this.lerpFactor);
        if(this.lerpFactor < 1.0){
            this.lerpFactor += this.lerpSpeed * deltaTime;
                        
            if(this.lerpFactor > 1.0) this.lerpFactor = 1.0;
        } 
    }

    updateScrollingVertical(deltaTime)
    {
        this.mesh.position.lerp(this.targetPos, this.lerpFactor);
        if(this.lerpFactor < 1.0){
            this.lerpFactor += this.lerpSpeed * deltaTime;
                        
            if(this.lerpFactor > 1.0) this.lerpFactor = 1.0;
        } 
    }
}