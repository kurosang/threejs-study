import * as THREE from 'three'
// 导入 轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import gsap from 'gsap'

// GOAL：dat.gui 轻量级UI界面控制库

import * as dat from 'dat.gui'

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

// 添加gui
const gui = new dat.GUI()
gui
  .add(cube.position, 'x')
  .min(0)
  .max(5)
  .step(0.01)
  .name('X轴')
  .onChange((v) => {
    console.log('值被修改', v)
  })
  .onFinishChange((v) => {
    console.log('onFinishChange完全停下来', v)
  })
// 修改物体颜色
const params = {
  color: '#ffff00',
  fn: () => {
    // 让立方体运动起来
    gsap.to(cube.position, { x: 5, duration: 3, repeat: -1 })
  },
}
gui.addColor(params, 'color').onChange((v) => {
  console.log('值被修改', v)
  cube.material.color.set(v)
})
// 设置选项框
gui.add(cube, 'visible').name('是否显示')
// 设置按钮点击触发某个事件
gui.add(params, 'fn').name('立方体运动')
// 添加文件夹
var folder = gui.addFolder('设置立方体')
folder.add(cube.material, 'wireframe')

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
  src / main / main05.js
  // 设置渲染器的像素比
  renderer.setPixelRatio(window.devicePixelRatio)
})
