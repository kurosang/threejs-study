import * as THREE from 'three'
// 导入 轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// console.log(THREE)

// GOAL：requestAnimationFrame 通过Clock跟踪时间处理动画

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
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 })
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
scene.add(cube)

// 初始化渲染器
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)

// 添加坐标辅助器
const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)

// 设置时钟
const clock = new THREE.Clock()

function animate() {
  // 获取时钟运行的总时长
  let time = clock.getElapsedTime()
  // 两帧运行间隔时间
  // let deltaTime = clock.getDelta()
  // console.log(deltaTime) // 0.16..  1000 / 16 =62.5，就是说我的电脑刷新率是60帧
  let t = time % 5 // 毫秒 => 秒
  cube.position.x = t * 1
  renderer.render(scene, camera)
  requestAnimationFrame(animate)
}
animate()
