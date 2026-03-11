import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

/* SCENE */

const scene = new THREE.Scene();

/* CAMERA */

const camera = new THREE.PerspectiveCamera(
75,
window.innerWidth / window.innerHeight,
0.1,
1000
);

camera.position.z = 4;

/* RENDERER */

const renderer = new THREE.WebGLRenderer({
antialias: true,
alpha: true
});

renderer.setSize(window.innerWidth, window.innerHeight);

document
.getElementById("three-container")
.appendChild(renderer.domElement);

/* GEOMETRY */

const geometry = new THREE.SphereGeometry(
2,
128,
128
);

/* MOUSE */

let mouseX = 0;
let mouseY = 0;

let targetX = 0;
let targetY = 0;

let dragging = false;

/* SHADER MATERIAL */

const material = new THREE.ShaderMaterial({

uniforms:{
time:{value:0},
mouse:{value:new THREE.Vector2(0,0)}
},

vertexShader:`

uniform float time;
varying vec3 vPosition;

void main(){

vPosition = position;

vec3 pos = position;

float wave1 = sin(pos.x * 3.0 + time * 1.5);
float wave2 = sin(pos.y * 4.0 + time * 1.2);
float wave3 = sin(pos.z * 2.5 + time * 2.0);

float displacement = (wave1 + wave2 + wave3) * 0.18;

pos += normal * displacement;

gl_Position =
projectionMatrix *
modelViewMatrix *
vec4(pos,1.0);

}

`,

fragmentShader:`

uniform float time;
uniform vec2 mouse;

varying vec3 vPosition;

vec3 hueToRGB(float h){

float r = abs(h*6.0-3.0)-1.0;
float g = 2.0-abs(h*6.0-2.0);
float b = 2.0-abs(h*6.0-4.0);

return clamp(vec3(r,g,b),0.0,1.0);

}

void main(){

float hue = mod(time*0.05 + vPosition.x*0.2 + mouse.x*0.3,1.0);

vec3 baseColor = hueToRGB(hue);

vec3 bright = baseColor * 0.9 + 0.1;
vec3 darker = baseColor * 0.55;

float blend = sin(time*0.7 + vPosition.y*3.0)*0.5+0.5;

vec3 color = mix(darker,bright,blend);

gl_FragColor = vec4(color,1.0);

}

`

});

/* BLOB */

const blob = new THREE.Mesh(
geometry,
material
);

scene.add(blob);

/* TRAIL SYSTEM */

const trailParticles = [];

const particleGeometry = new THREE.SphereGeometry(0.22,16,16);

function createTrail(x,y){

const hue = Math.random();

const particleMaterial = new THREE.MeshBasicMaterial({
transparent:true,
opacity:0.9,
color:new THREE.Color().setHSL(hue,0.7,0.55)
});

const particle = new THREE.Mesh(
particleGeometry,
particleMaterial);

particle.position.set(x*2, y*2, 0);

scene.add(particle);

trailParticles.push(particle);

}

/* MOUSE MOVE */

window.addEventListener("mousemove",(event)=>{

mouseX = (event.clientX/window.innerWidth)*2-1;
mouseY = -(event.clientY/window.innerHeight)*2+1;

material.uniforms.mouse.value.x = mouseX;
material.uniforms.mouse.value.y = mouseY;

createTrail(mouseX,mouseY);
createTrail(mouseX,mouseY);

if(dragging){

targetX = mouseX * 2;
targetY = mouseY * 2;

}

});

/* MOUSE BUTTONS */

window.addEventListener("mousedown",()=>{

dragging = true;

});

window.addEventListener("mouseup",()=>{

dragging = false;

});

/* ANIMATION */

function animate(){

requestAnimationFrame(animate);

/* slower morphing */

material.uniforms.time.value += 0.011;

/* smoother blob movement */

blob.position.x += (targetX - blob.position.x) * 0.045;
blob.position.y += (targetY - blob.position.y) * 0.045;

/* slower rotation */

blob.rotation.y += 0.0014;

/* TRAIL FADE */

for(let i=0;i<trailParticles.length;i++){

let p = trailParticles[i];

p.material.opacity *= 0.96;

p.scale.multiplyScalar(1.01);

if(p.material.opacity < 0.03){

scene.remove(p);
trailParticles.splice(i,1);

}

}

/* BACKGROUND SHIFT */

if(dragging){

const hue = (Date.now()*0.02)%360;

document.body.style.backgroundColor =
"hsl("+hue+",60%,45%)";

}

renderer.render(scene,camera);

}

animate();

/* RESIZE */

window.addEventListener("resize",()=>{

camera.aspect =
window.innerWidth /
window.innerHeight;

camera.updateProjectionMatrix();

renderer.setSize(
window.innerWidth,
window.innerHeight
);

});
