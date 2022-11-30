import * as THREE from "three";
// 导入 轨道控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import gsap from "gsap";

// GOAL：认识材质和纹理

// 1. 创建场景
const scene = new THREE.Scene();

// 2. 创建相机
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
// x y z
camera.position.set(0, 0, 10);
scene.add(camera);

//导入纹理，本质加载图片
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load("./images/texture.jpeg");

// 添加物体
// 创建几何体

const cubeGeo = new THREE.BoxGeometry(5, 5, 5);

const basicMaterial = new THREE.MeshBasicMaterial({
  color: "#ffffff",
  map: texture,
});

const cube = new THREE.Mesh(cubeGeo, basicMaterial);

scene.add(cube);

// 初始化渲染器
const renderer = new THREE.WebGLRenderer();

// 设置渲染的尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight);

// console.log(renderer)

// 将webgl渲染的canvas内容添加到body上
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
// 设置控制器阻尼，让控制器更有真实效果。请注意，如果该值被启用，你将必须在你的动画循环里调用.update()。
controls.enableDamping = true;

function animate() {
  controls.update();

  renderer.render(scene, camera);

  requestAnimationFrame(animate);
}
animate();
