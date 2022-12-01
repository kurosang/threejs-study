import * as THREE from 'three'
// 导入 轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// GOAL：打造酷炫的三角形

// 1. 创建场景
const scene = new THREE.Scene()

// 2. 创建相机
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)
camera.position.set(0, 0, 10)
scene.add(camera)

// 添加物体
// 创建几何体
for (let i = 0; i < 50; i++) {
  // 每一个三角形需要三个顶点、每个顶点需要3个值
  const geometry = new THREE.BufferGeometry()
  const postionArray = new Float32Array(9)
  for (let j = 0; j < 9; j++) {
    postionArray[j] = Math.random() * 10 - 5
  }
  // itemSize = 3 因为每个顶点都是一个三元组。
  geometry.setAttribute('position', new THREE.BufferAttribute(postionArray, 3))
  let color = new THREE.Color(Math.random(), Math.random(), Math.random())
  // 材质
  const material = new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity: 0.7,
  })

  // 根据几何体和材质创建物体
  const mesh = new THREE.Mesh(geometry, material)
  // 将几何体添加到场景中
  scene.add(mesh)
}

// 初始化渲染器
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true

function animate() {
  controls.update()
  renderer.render(scene, camera)
  requestAnimationFrame(animate)
}
animate()
