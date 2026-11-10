import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'; 
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'; 

const w = window.innerWidth;
const h = window.innerHeight;





const renderer = new THREE.WebGLRenderer({antialias: true, alpha:false})
renderer.setSize(w,h);

document.body.appendChild(renderer.domElement);

const fov = 75;
const aspect = w/h;
const near = 0.1;
const far = 10;
const camera = new THREE.PerspectiveCamera(fov,aspect,near,far);

camera.position.z = 2;


const color_backgroundLightMode = new THREE.Color().setHex( 0xffffff );
const color_backgroundDarkMode = new THREE.Color().setHex( 0x000000 );
const scene = new THREE.Scene({alpha: false, background: color_backgroundLightMode});
scene.background = color_backgroundLightMode;

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enableZoom = false;

const geo = new THREE.IcosahedronGeometry(1.0, 2);
const mat = new THREE.MeshBasicMaterial({color: 0xccff});

const mesh = new THREE.Mesh(geo,mat);
scene.add(mesh)

var parameters = { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBAFormat, stencilBuffer: false }
var renderTarget = new THREE.WebGLRenderTarget( w, h, parameters );

let composer = new EffectComposer(renderer, renderTarget);

let renderPass = new RenderPass( scene, camera ); 
composer.addPass( renderPass ); 
let glowPass = new UnrealBloomPass({strength: 1, radius: 2});
composer.addPass( glowPass ); 

window.addEventListener("resize", onWindowResize,false);

function onWindowResize() {
    UpdateComposer();
}

function UpdateComposer(){
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
    glowPass = new UnrealBloomPass({strength: 1, radius: 2});
    glowPass.renderToScreen = true;
    composer.addPass( glowPass ); 
}

const themeSwitchBackground = document.getElementById('theme-switch-btn');

let darkmode = localStorage.getItem('darkmode');

const enabledBackgroundDarkmode = () => {
    scene.background = color_backgroundDarkMode;
    UpdateComposer();
} 

const disableBackgroundDarkmode = () => {
    scene.background = color_backgroundLightMode;
    UpdateComposer();
} 
themeSwitchBackground.addEventListener("click", () => {
    darkmode = localStorage.getItem('darkmode');
            console.debug(darkmode.toString());

    darkmode !== "active" ? enabledBackgroundDarkmode() : disableBackgroundDarkmode()
});

if(darkmode === "active") enabledBackgroundDarkmode();


function update(t = 0){
    requestAnimationFrame(update);
    composer.render(scene, camera);
    controls.update();
}
update();
