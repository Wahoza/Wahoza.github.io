import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'; 
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'; 
import { Dot } from '/BackgroundEffect/dotClass.js';

const w = window.innerWidth;
const h = window.innerHeight;

let outerSphereDots = [];
let outerSpherePivots = new THREE.Group();

let color_topDot = new THREE.Color("rgb(152, 255, 105)");
let color_bottomDot = new THREE.Color( "rgb(255, 0, 128)" );

let float_bloomStrength = 2;
let float_bloomRadius = 1;

const renderer = new THREE.WebGLRenderer({antialias: true, alpha:false})
renderer.setSize(w,h);

document.body.appendChild(renderer.domElement);

const fov = 75;
const aspect = w/h;
const near = 0.1;
const far = 1000;
const camera = new THREE.PerspectiveCamera(fov,aspect,near,far);

camera.position.z = 55;


const color_backgroundLightMode = new THREE.Color().setHex( 0xffffff );
const color_backgroundDarkMode = new THREE.Color().setHex( 0x000000 );
const scene = new THREE.Scene({alpha: false, background: color_backgroundLightMode});
scene.background = color_backgroundLightMode;

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enableZoom = false;




var outerSphere = new THREE.Mesh(new THREE.SphereGeometry(8,32,32), new THREE.MeshBasicMaterial());
let outerPositionAttribute = outerSphere.geometry.attributes.position;

for(let i = 0; i < outerPositionAttribute.count; i++){
     const vertex = new THREE.Vector3();
     vertex.fromBufferAttribute(outerPositionAttribute, i);
     let color_selectedColor = new THREE.Color().lerpColors(color_bottomDot, color_topDot, i / outerPositionAttribute.count);
     const globalPos = vertex.clone().applyMatrix4(outerSphere.matrixWorld);

     let pivot = new THREE.Group();
     pivot.position.copy(globalPos);
     let dot = new Dot(10, 0.2, pivot,i,color_selectedColor);
     outerSphereDots.push(dot);

     pivot.add(dot.mesh);
     dot.mesh.position.copy(new THREE.Vector3());
     outerSpherePivots.add(pivot); 
}

scene.add(outerSpherePivots);




var parameters = { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBAFormat, stencilBuffer: false }
var renderTarget = new THREE.WebGLRenderTarget( w, h, parameters );

let composer = new EffectComposer(renderer, renderTarget);

let renderPass = new RenderPass( scene, camera ); 
composer.addPass( renderPass ); 

let glowPass = new UnrealBloomPass({strength: float_bloomStrength, radius: float_bloomRadius});
glowPass.renderToScreen = true;

window.addEventListener("resize", onWindowResize,false);

function onWindowResize() {
    UpdateComposer((localStorage.getItem('darkmode') === "active"));
}

function UpdateComposer(useGlow){

    var width = window.innerWidth || 1;
    var height = window.innerHeight || 1;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();


    renderer.setSize( width, height ); 
    var parameters = { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBAFormat, stencilBuffer: true }
    
    var renderTarget = new THREE.WebGLRenderTarget( width, height, parameters );

    composer = new EffectComposer(renderer, renderTarget);

    renderPass = new RenderPass( scene, camera ); 
    composer.addPass( renderPass ); 


    if(useGlow){
        composer.addPass( glowPass );
    }
}

const themeSwitchBackground = document.getElementById('theme-switch-btn');

let darkmode = localStorage.getItem('darkmode');

const enabledBackgroundDarkmode = () => {
    scene.background = color_backgroundDarkMode;
    UpdateComposer(true);
} 

const disableBackgroundDarkmode = () => {
    scene.background = color_backgroundLightMode;
    UpdateComposer(false);
} 
themeSwitchBackground.addEventListener("click", () => {
    darkmode = localStorage.getItem('darkmode');

    darkmode !== "active" ? enabledBackgroundDarkmode() : disableBackgroundDarkmode()
});

if(darkmode === "active") enabledBackgroundDarkmode(); else disableBackgroundDarkmode();


var vec_cursorPos = new THREE.Vector2();
var vec_cursorDir = new THREE.Vector3();
document.addEventListener("mousemove", onDocumentMouseMove, false);
function onDocumentMouseMove(event){
     
     event.preventDefault();

     vec_cursorPos.x = (event.clientX / window.innerWidth) * 2 - 1;
     vec_cursorPos.y = - (event.clientY / window.innerHeight) * 2 + 1;

     var vector = new THREE.Vector3(vec_cursorPos.x, vec_cursorPos.y, 0.5);
     vector.unproject( camera );
     var dir = vector.sub( camera.position ).normalize();
     camera.getWorldDirection(vec_cursorDir);
     var distance = - camera.position.z / dir.z;
     vec_cursorPos = camera.position.clone().add( dir.multiplyScalar( distance ) );

}

let elapsed = 0;
function update(t = 0){
    requestAnimationFrame(update);

    let deltaTime = (t - elapsed) / 100;

    elapsed = t;

    for(let i = 0; i < outerSphereDots.length; i++){
          outerSphereDots[i].avoidMouse(vec_cursorPos, vec_cursorDir);
          outerSphereDots[i].controlMovement(deltaTime);

    }


    composer.render(scene, camera);
    controls.update();
}
update();
