import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'; 
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'; 
import { Dot } from '/BackgroundEffect/dotClass.js';

const w = window.innerWidth;
const h = window.innerHeight;

const backgroundSection = document.getElementById('background-effects');

let outerDots = [];
let dotPivots = new THREE.Group();
let outerSpherePivots = new THREE.Group();
let outerSquarePivots = new THREE.Group();

let color_topDot = new THREE.Color("rgb(152, 255, 105)");
let color_bottomDot = new THREE.Color( "rgb(255, 0, 128)" );

let float_bloomStrength = 2;
let float_bloomRadius = 1;
let float_orbRadius = 20;
let float_orbWidth = 32;

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
const cameraZ = 55;
const camera = new THREE.PerspectiveCamera(fov,aspect,near,far);

camera.position.z = cameraZ;


const color_backgroundLightMode = new THREE.Color().setHex( 0xffffff );
const color_backgroundDarkMode = new THREE.Color().setHex( 0x000000 );
const scene = new THREE.Scene({alpha: false, background: color_backgroundLightMode});
scene.background = color_backgroundLightMode;

if(bool_useOrbitControls){
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enableZoom = false;
}

var outerSphere = new THREE.Mesh(new THREE.SphereGeometry(float_orbRadius, float_orbWidth, float_orbWidth), new THREE.MeshBasicMaterial());
let outerPositionAttribute = outerSphere.geometry.attributes.position;

for(let i = 0; i < outerPositionAttribute.count; i++){
     const vertex = new THREE.Vector3();
     vertex.fromBufferAttribute(outerPositionAttribute, i);
     const globalPos = vertex.clone().applyMatrix4(outerSphere.matrixWorld);

     let color_selectedColor = new THREE.Color().lerpColors(color_topDot,color_bottomDot , i / outerPositionAttribute.count);

     let spherePivot = new THREE.Group();
     spherePivot.position.copy(globalPos);

     let dotPivot = new THREE.Group();
     dotPivot.position.copy(globalPos);

     let dot = new Dot(0.2,i, dotPivot, color_selectedColor);
     dot.setSphereData(spherePivot);

     outerDots.push(dot);

     dotPivot.add(dot.mesh);

     dot.mesh.position.copy(new THREE.Vector3());
     outerSpherePivots.add(spherePivot); 

     scene.add(dotPivot);
}

scene.add(outerSpherePivots);


function UpdateWindowSquarePivots(){

    scene.remove(outerSquarePivots);
    outerSquarePivots.clear();
    let outerSqrtCt = Math.sqrt(outerDots.length);
    camera.updateMatrixWorld();
    camera.updateProjectionMatrix();
    camera.updateMatrix();
    camera.updateWorldMatrix();

    let target = new THREE.Vector2();
    camera.getViewSize( cameraZ, target );

    let leftBtm = new THREE.Vector3( -target.x / 2 - 1, -target.y / 2 -1, 0);
    let leftTop = new THREE.Vector3( -target.x / 2 - 1, target.y / 2 + 1, 0);
    let rightBtm = new THREE.Vector3( target.x / 2 + 1, -target.y / 2 - 1, 0);
    let rightTop = new THREE.Vector3( target.x / 2 + 1, target.y / 2 + 1, 0);

    let leftVector = new THREE.Vector3(rightTop.x - leftTop.x, rightTop.y - leftTop.y, rightTop.z - leftTop.z);
    let leftVectorElementSpacing = new THREE.Vector3(leftVector.x / outerSqrtCt, leftVector.y / outerSqrtCt, leftVector.z / outerSqrtCt);

    let upVector = new THREE.Vector3(leftBtm.x - leftTop.x, leftBtm.y - leftTop.y, leftBtm.z - leftTop.z);
    let upVectorElementSpacing = new THREE.Vector3(upVector.x / outerSqrtCt,upVector.y / outerSqrtCt,upVector.z / outerSqrtCt);

    for(let i = 0; i < outerDots.length; i++){
        let modVal = i % outerSqrtCt;
        let divisionVal = Math.floor(i/outerSqrtCt);

        let btm =  new THREE.Vector3();
        btm.x = leftVectorElementSpacing.x * modVal;
        btm.y = leftVectorElementSpacing.y * modVal;
        btm.z = leftVectorElementSpacing.z * modVal;


        let up = new THREE.Vector3();

        up.x = upVectorElementSpacing.x * divisionVal;
        up.y = upVectorElementSpacing.y * divisionVal;
        up.z = upVectorElementSpacing.z * divisionVal;

        const globalPos = new THREE.Vector3(btm.x + up.x - rightBtm.x, btm.y + up.y - rightBtm.y, btm.z + up.z)
        let squarePivot = new THREE.Group();
        squarePivot.position.copy(globalPos);

        outerDots[i].setSquareData(squarePivot);
        //squarePivot.add(outerSphereDots[i].mesh);
        outerSquarePivots.add(squarePivot);
    }
    scene.add(outerSquarePivots);
}

scene.add(outerSquarePivots);
UpdateWindowSquarePivots()

var parameters = { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBAFormat, stencilBuffer: false }
var renderTarget = new THREE.WebGLRenderTarget( w, h, parameters );

let composer = new EffectComposer(renderer, renderTarget);

let renderPass = new RenderPass( scene, camera ); 
composer.addPass( renderPass ); 

let glowPass = new UnrealBloomPass({strength: float_bloomStrength, radius: float_bloomRadius});
glowPass.renderToScreen = true;

window.addEventListener("resize", onWindowResize,false);

window.addEventListener("deviceorientation", onWindowResize);

function onWindowResize() {
    UpdateComposer(!(localStorage.getItem('darkmode') === "false"));
    UpdateWindowSquarePivots();
    CheckCurrentSection();
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

if(darkmode === "active") enabledBackgroundDarkmode(); else if(darkmode === "false") disableBackgroundDarkmode(); else enabledBackgroundDarkmode();


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
    let prevMode = string_ModeString;
    string_ModeString = 'square';
    for(let i = 0; i < arr_circleSections.length; i++){
        if (arr_circleSections[i]== string_CurrentSectionClass) { string_ModeString = string_CircleString};
    } 

    if(prevMode != string_ModeString){
        for(let i = 0; i < outerDots.length; i++){
            outerDots[i].lerpPivotFactor = 0;
        }
    }
}


const sections = document.querySelectorAll("section");

let topSection = sections[0];
let topSectionHeight = sections[0].offsetTop;

string_CurrentSectionClass = sections[0].className;

function CheckCurrentSection(){
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
}

(function (){
    window.addEventListener("load", () => {

        topSection = sections[0];
        topSectionHeight = sections[0].offsetTop;

        string_CurrentSectionClass = sections[0].className;
        CheckCurrentSection();
    });

    window.addEventListener("scroll", () => {
        CheckCurrentSection();
    });

})();

let elapsed = 0;
function update(t = 0){
    requestAnimationFrame(update);

    let deltaTime = (t - elapsed) / 100;

    elapsed = t;
    
    if(string_ModeString == string_CircleString)
    {
        outerSpherePivots.rotation.y += 0.01 * deltaTime;
        outerSpherePivots.updateMatrixWorld();
        outerSpherePivots.updateWorldMatrix();
        outerSpherePivots.updateMatrix();

        for(let i = 0; i < outerDots.length; i++){
            outerDots[i].avoidMouse(vec_cursorPos, vec_cursorDir);
            outerDots[i].update(deltaTime);
            outerDots[i].updateSpherePivots(deltaTime);
        }
    }
    else
    {
        for(let i = 0; i < outerDots.length; i++){
            outerDots[i].avoidMouse(vec_cursorPos, vec_cursorDir);
            outerDots[i].update(deltaTime);
            outerDots[i].updateSquarePivots(deltaTime);
        }
    }


    composer.render(scene, camera);

    if(bool_useOrbitControls) controls.update();
}
update();
