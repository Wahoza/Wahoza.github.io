import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'; 
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'; 
import { Dot } from '/BackgroundEffect/dotClass.js';

const w = window.innerWidth;
const h = window.innerHeight;

const backgroundSection = document.getElementById('background-effects');

let outerSphereDots = [];
let outerSpherePivots = new THREE.Group();

let color_topDot = new THREE.Color("rgb(152, 255, 105)");
let color_bottomDot = new THREE.Color( "rgb(255, 0, 128)" );

let float_bloomStrength = 2;
let float_bloomRadius = 1;
let float_orbRadius = 20;

let bool_useOrbitControls = false;


let arr_circleSections = ['about', 'contact'];
let string_CircleString = 'circle';
let string_VerticalScrollString = 'verticalScroll';
let string_ModeString = string_CircleString;
let string_CurrentSectionClass = '';

const renderer = new THREE.WebGLRenderer({antialias: true, alpha:false, canvas:backgroundSection})
renderer.setSize(w,h);

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

if(bool_useOrbitControls){
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enableZoom = false;
}

var outerSphere = new THREE.Mesh(new THREE.SphereGeometry(float_orbRadius,32,32), new THREE.MeshBasicMaterial());
let outerPositionAttribute = outerSphere.geometry.attributes.position;

for(let i = 0; i < outerPositionAttribute.count; i++){
     const vertex = new THREE.Vector3();
     vertex.fromBufferAttribute(outerPositionAttribute, i);
     let color_selectedColor = new THREE.Color().lerpColors(color_bottomDot, color_topDot, i / outerPositionAttribute.count);
     const globalPos = vertex.clone().applyMatrix4(outerSphere.matrixWorld);

     let spherePivot = new THREE.Group();
     spherePivot.position.copy(globalPos);
     let dot = new Dot(0.2,i,color_selectedColor);
     dot.setSphereData(10, spherePivot);

     outerSphereDots.push(dot);

     spherePivot.add(dot.mesh);
     dot.mesh.position.copy(new THREE.Vector3());
     outerSpherePivots.add(spherePivot); 
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
camera.getWorldDirection(vec_cursorDir);

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

function determineMode(){
    string_ModeString = '';
    for(let i = 0; i < arr_circleSections.length; i++){
        if (arr_circleSections[i]== string_CurrentSectionClass) { string_ModeString = string_CircleString};
    } 
    console.log(string_ModeString)
}

(function (){
    const sections = document.querySelectorAll("section");

    let topSection = sections[0];
    let topSectionHeight = sections[0].offsetTop;

    string_CurrentSectionClass = sections[0].className;

    window.addEventListener("load", () => {
        let scrollTop = window.scrollY;
        let windowHeight = window.innerHeight;
        let documentHeight = document.body.offsetHeight;

        topSectionHeight = topSection.offsetTop + topSection.offsetHeight;


        sections.forEach( panel => {
            if(scrollTop <= panel.offsetTop + panel.offsetHeight - windowHeight / 2 ){
                if(panel.offsetTop + panel.offsetHeight < topSectionHeight - windowHeight / 2){
                    topSection = panel;
                    topSectionHeight = topSection.offsetTop + panel.offsetHeight;
                }
            }

        });

        string_CurrentSectionClass = topSection.className;
        determineMode();
    });

    window.addEventListener("scroll", () => {
        let scrollTop = window.scrollY;
        let windowHeight = window.innerHeight;
        let documentHeight = document.body.offsetHeight;

        if(scrollTop >= topSectionHeight - windowHeight){
            topSectionHeight = Number.MAX_VALUE;
        }else{
            topSectionHeight = topSection.offsetTop;
        }

        sections.forEach( panel => {
            if(scrollTop <= panel.offsetTop + panel.offsetHeight - windowHeight / 2 ){
                if(panel.offsetTop + panel.offsetHeight < topSectionHeight - windowHeight / 2){
                    topSection = panel;
                    topSectionHeight = topSection.offsetTop + panel.offsetHeight;
                }
            }

        });
        
        string_CurrentSectionClass = topSection.className;
        determineMode();
    });

})();
let elapsed = 0;
function update(t = 0){
    requestAnimationFrame(update);

    let deltaTime = (t - elapsed) / 100;

    elapsed = t;
    
    if(string_ModeString == string_CircleString)
    {
        for(let i = 0; i < outerSphereDots.length; i++){
            outerSphereDots[i].avoidMouse(vec_cursorPos, vec_cursorDir);

            if(string_ModeString == string_CircleString) outerSphereDots[i].updateCircle(deltaTime);
        }
    }else
    {
        for(let i = 0; i < outerSphereDots.length; i++){
            outerSphereDots[i].avoidMouse(vec_cursorPos, vec_cursorDir);

            if(string_ModeString == string_CircleString) outerSphereDots[i].updateScrollingVertical(deltaTime);
        }
    }


    composer.render(scene, camera);

    if(bool_useOrbitControls) controls.update();
}
update();
