import * as THREE from 'three'
// 导入 轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import gsap from 'gsap'

// GOAL：掌握GSAP

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
// 设置控制器阻尼，让控制器更有真实效果。请注意，如果该值被启用，你将必须在你的动画循环里调用.update()。
controls.enableDamping = true

// 添加坐标辅助器
const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)

// 设置时钟
const clock = new THREE.Clock()

// 设置动画
var animateController = gsap.to(cube.position, {
  x: 5,
  duration: 5,
  ease: 'slow(0.7, 0.7, false)',
  repeat: -1, // 重复次数 无限次就是-1
  yoyo: true, // 往返运动
  delay: 2, // 延迟开始
  onComplete: () => {
    console.log('finished')
  },
  onStart: () => {
    console.log('start')
  },
})
gsap.to(cube.rotation, { x: 2 * Math.PI, duration: 5 })

console.log(animateController, animateController.__proto__.__proto__)
window.addEventListener('dblclick', () => {
  if (animateController.isActive()) {
    animateController.pause()
  } else {
    animateController.resume()
  }
})

function animate() {
  controls.update()

  renderer.render(scene, camera)

  requestAnimationFrame(animate)
}
animate()

// 监听画面的变化，更新渲染画面
window.addEventListener('resize', () => {
  console.log('resize')

  // 更新摄像头
  camera.aspect = window.innerWidth / window.innerHeight

  // 更新摄像机的投影矩阵
  camera.updateProjectionMatrix()

  // 更新渲染器
  renderer.setSize(window.innerWidth, window.innerHeight)

  // 设置渲染器的像素比
  renderer.setPixelRatio(window.devicePixelRatio)
})
