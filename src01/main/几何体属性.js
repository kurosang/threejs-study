import * as THREE from 'three'
// 导入 轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import gsap from 'gsap'

// GOAL：掌握几何体顶点、uv、法向属性

// 1. 创建场景
const scene = new THREE.Scene()

// 2. 创建相机
const arr = [75, window.innerWidth / window.innerHeight, 0.1, 1000]
const camera = new THREE.PerspectiveCamera(...arr)
camera.position.set(0, 0, 10) // x y z
scene.add(camera)

// 添加物体
// 创建几何体
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 }) // 材质
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial) // 根据几何体和材质创建物体
console.log(cubeGeometry)
console.log(cube)
scene.add(cube) // 将几何体添加到场景中

// 初始化渲染器
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight) // 设置渲染的尺寸大小
document.body.appendChild(renderer.domElement) // 将webgl渲染的canvas内容添加到body上

// 控制器
const controls = new OrbitControls(camera, renderer.domElement) // 设置控制器阻尼，让控制器更有真实效果。请注意，如果该值被启用，你将必须在你的动画循环里调用.update()。
controls.enableDamping = true

// 渲染函数
function animate() {
  controls.update()
  renderer.render(scene, camera)
  requestAnimationFrame(animate)
}
animate()
