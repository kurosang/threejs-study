import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// GOAl: 环境遮挡贴图与强度 环境遮挡(Ambient Occlusion)

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

// 导入纹理
let textureLoader = new THREE.TextureLoader()
let doorColorTexture = textureLoader.load(colorImg)
// 透明纹理的使用
let doorAlphaTexture = textureLoader.load(alphaImg)
// Load Ao
let dooAoTexture = textureLoader.load(aoImg)

// 添加物体
let cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
cubeGeometry.setAttribute(
  'uv2',
  new THREE.BufferAttribute(cubeGeometry.attributes.uv.array, 2)
)
let material = new THREE.MeshBasicMaterial({
  color: '#ffff00',
  map: doorColorTexture,
  alphaMap: doorAlphaTexture,
  aoMap: dooAoTexture,
  transparent: true,
  // side: THREE.DoubleSide, // 双面渲染
})
let cube = new THREE.Mesh(cubeGeometry, material)
scene.add(cube)

//添加平面
const planeGeometry = new THREE.PlaneGeometry(1, 1)
// Ao 需要设置第二个uv
planeGeometry.setAttribute(
  'uv2',
  new THREE.BufferAttribute(planeGeometry.attributes.uv.array, 2)
)
const plane = new THREE.Mesh(planeGeometry, material)
plane.position.set(1.5, 0, 0)
scene.add(plane)

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
