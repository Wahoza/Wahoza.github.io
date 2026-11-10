import * as THREE from "three";

const dotSettings = {
    distanceAffection : 20.0,
    avoidanceFactor: 20.0,
}



export class Dot{
    constructor(radius, size, pivot, dotId, dotColor){
        let dotMaterial = new THREE.MeshBasicMaterial({color: dotColor});

        this.mesh = new THREE.Mesh(new THREE.BoxGeometry(size,size,size), dotMaterial);
        this.pivot = pivot;
        this.isAvoiding = false;
        this.lerpFactor = 0.0;
        this.velocityX = 0;
        this.velocityY = 0;
        this.lerpSpeed = 0.005;
        this.isAvoiding = false;
        this.radius = radius;
        this.targetPos = new THREE.Vector3(); 
        this.id = dotId;
    }
          
    avoidMouse(mousePos, cameraDir){
        let dotGlobalPos = new THREE.Vector3();
        let pivotGlobalPos = new THREE.Vector3();

        let vecToDodge = new THREE.Vector3();
        let dodgePos = new THREE.Vector3(0,0,0);
         
        this.mesh.getWorldPosition(dotGlobalPos);
        this.pivot.getWorldPosition(pivotGlobalPos)


        let distance;
        vecToDodge = cameraDir + mousePos;
        //  let projPivotPos =  cameraDir.projectOnVector(dotGlobalPos);

        let cameraPlane = new THREE.Plane(cameraDir, 0);
        let result = new THREE.Vector3();
        cameraPlane.projectPoint(mousePos, dodgePos);

        distance = pivotGlobalPos.distanceTo(dodgePos);
        if(distance < dotSettings.distanceAffection){
            let dir = new THREE.Vector3();

            if(dotSettings.avoidRelativeToPivot){
                dir = new THREE.Vector3(pivotGlobalPos.x-dodgePos.x, pivotGlobalPos.y-dodgePos.y, pivotGlobalPos.z-dodgePos.z);
            }
            else{
                dir = new THREE.Vector3(dotGlobalPos.x-dodgePos.x, dotGlobalPos.y-dodgePos.y, dotGlobalPos.z-dodgePos.z);
            }
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
}