import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// GOAl: 设置金属度和金属度贴图

// 场景
let scene = new THREE.Scene()

// 相机
// 通过将参数抽离的方式，避免被格式化
let arr = [45, window.innerWidth / window.innerHeight, 1, 100000]
let camera = new THREE.PerspectiveCamera(...arr)
camera.position.set(0, 0, 6)
camera.lookAt(scene.position)

// assets
const colorImg = require('../assets/textures/door/color.jpg')
const alphaImg = require('../assets/textures/door/alpha.jpg')
const aoImg = require('../assets/textures/door/ambientOcclusion.jpg')
const heightImg = require('../assets/textures/door/height.jpg')
const roughnessImg = require('../assets/textures/door/roughness.jpg')
const metalnessImg = require('../assets/textures/door/metalness.jpg')

// 导入纹理
let textureLoader = new THREE.TextureLoader()
let doorColorTexture = textureLoader.load(colorImg)
// 透明纹理的使用
let doorAlphaTexture = textureLoader.load(alphaImg)
// Load Ao
let doorAoTexture = textureLoader.load(aoImg)
// load 置换
let doorHeightTexture = textureLoader.load(heightImg)
const roughnessTexture = textureLoader.load(roughnessImg)
const metalnessTexture = textureLoader.load(metalnessImg)

// 添加物体
let cubeGeometry = new THREE.BoxGeometry(1, 1, 1, 200, 200, 200)
cubeGeometry.setAttribute(
  'uv2',
  new THREE.BufferAttribute(cubeGeometry.attributes.uv.array, 2)
)
let material = new THREE.MeshStandardMaterial({
  color: '#ffff00',
  map: doorColorTexture,
  alphaMap: doorAlphaTexture,
  aoMap: doorAoTexture,
  transparent: true,
  displacementMap: doorHeightTexture,
  displacementScale: 0.05,
  roughness: 1,
  roughnessMap: roughnessTexture,
  metalness: 1,
  metalnessMap: metalnessTexture,
})
let cube = new THREE.Mesh(cubeGeometry, material)
scene.add(cube)

//添加平面
const planeGeometry = new THREE.PlaneGeometry(1, 1, 200, 200)
// Ao 需要设置第二个uv
planeGeometry.setAttribute(
  'uv2',
  new THREE.BufferAttribute(planeGeometry.attributes.uv.array, 2)
)
const plane = new THREE.Mesh(planeGeometry, material)
plane.position.set(1.5, 0, 0)
scene.add(plane)

// 灯光
// 环境光
const light = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(light)
// 直线光
const directionalLight = new THREE.DirectionalLight(0xffffff)
directionalLight.position.set(10, 10, 10)
scene.add(directionalLight)

// 渲染器
let renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// 控制器
let controls = new OrbitControls(camera, renderer.domElement)

// 辅助坐标
let axesHelper = new THREE.AxesHelper(25)
scene.add(axesHelper)

// 渲染函数
function render() {
  renderer.render(scene, camera)
  requestAnimationFrame(render)
}

render()
