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
// x y z
camera.position.set(0, 0, 10)
scene.add(camera)

// 添加物体
// 创建几何体
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
// 材质
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 })

// 根据几何体和材质创建物体
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
console.log(cube)

// 修改物体的位置
// cube.position.set(5, 0, 0)
// cube.position.y = 2

//缩放
// cube.scale.set(3, 2, 1)
// cube.scale.x = 5

//旋转
// cube.rotation.set(Math.PI / 4, 0, 0)

// 将几何体添加到场景中
scene.add(cube)

// 初始化渲染器
const renderer = new THREE.WebGLRenderer()

// 设置渲染的尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight)

// console.log(renderer)

// 将webgl渲染的canvas内容添加到body上
document.body.appendChild(renderer.domElement)

// // 使用渲染器，通过相机将场景渲染进来
// renderer.render(scene, camera)

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
