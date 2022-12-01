import * as THREE from 'three'
// 导入 轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import gsap from 'gsap'

// GOAL：BufferGeometry设置顶点创建矩形

// 1. 创建场景
const scene = new THREE.Scene()

// 2. 创建相机
const arr = [75, window.innerWidth / window.innerHeight, 0.1, 1000]
const camera = new THREE.PerspectiveCamera(...arr)
camera.position.set(0, 0, 10) // x y z
scene.add(camera)

// 添加物体
// 创建几何体
const geometry = new THREE.BufferGeometry(1, 1, 1)
const vertices = new Float32Array([
  -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0,

  1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0,
])
// itemSize = 3 因为每个顶点都是一个三元组。
geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 }) // 材质
const mesh = new THREE.Mesh(geometry, material) // 根据几何体和材质创建物体
scene.add(mesh)
console.log(mesh)

// 初始化渲染器
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

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
