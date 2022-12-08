import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
//GOAL：点（Points）一个用于显示点的类。

import { MeshBasicMaterial } from 'three'

// 场景
let scene = new THREE.Scene()

// 相机
// 通过将参数抽离的方式，避免被格式化
let arr = [45, window.innerWidth / window.innerHeight, 1, 100000]
let camera = new THREE.PerspectiveCamera(...arr)
camera.position.set(1, 1, 20)
camera.lookAt(scene.position)

// 添加球体
const sphereGeometry = new THREE.SphereGeometry(1, 30, 30)
const material = new THREE.MeshBasicMaterial({
  color: 0xff0000,
  wireframe: true,
})
// const sphere = new THREE.Mesh(sphereGeometry, material)
// scene.add(sphere)

// 设置点材质
const pointMaterial = new THREE.PointsMaterial()
pointMaterial.size = 0.1
pointMaterial.color.set(0xffff00)
//指定点的大小是否因相机深度而衰减。（仅限透视摄像头。）默认为true。开启了就是 近的大一点，远的小一点。关了之后所有一样大
pointMaterial.sizeAttenuation = true

// 载入纹理
const t_img = require('../assets/textures/particles/1.png')
const textureLoader = new THREE.TextureLoader()
const texture = textureLoader.load(t_img)

// 设置纹理
pointMaterial.map = texture
// 透明
pointMaterial.transparent = true
pointMaterial.alphaMap = texture
pointMaterial.depthWrite = false
pointMaterial.blending = THREE.AdditiveBlending // 两个点叠加显示更亮

const points = new THREE.Points(sphereGeometry, pointMaterial)
scene.add(points)

// 渲染器
let renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
// 1.设置渲染器开启阴影计算
renderer.shadowMap.enabled = true

renderer.physicallyCorrectLights = true
document.body.appendChild(renderer.domElement)

// 控制器
new OrbitControls(camera, renderer.domElement)

// 辅助坐标
let axesHelper = new THREE.AxesHelper(25)
scene.add(axesHelper)

//设置时钟
const clock = new THREE.Clock()

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement)

// 渲染函数
function render() {
  controls.update()
  renderer.render(scene, camera)
  requestAnimationFrame(render)
}

render()
