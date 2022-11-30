import * as THREE from "three";
// 导入 轨道控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import gsap from "gsap";

// GOAL：BufferGeometry设置顶点创建矩形

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

// 添加物体
// 创建几何体
const geometry = new THREE.BufferGeometry(1, 1, 1);
const vertices = new Float32Array([
  -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0,

  1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0,
]);

// itemSize = 3 因为每个顶点都是一个三元组。
geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));

// 材质
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });

// 根据几何体和材质创建物体
const mesh = new THREE.Mesh(geometry, material);

console.log(mesh);

// 将几何体添加到场景中
scene.add(mesh);

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
