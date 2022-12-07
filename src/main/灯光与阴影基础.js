import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
//GOAL： 灯光与阴影
// 材质要满足光照，步骤看1-4

// 场景
let scene = new THREE.Scene()

// 相机
// 通过将参数抽离的方式，避免被格式化
let arr = [45, window.innerWidth / window.innerHeight, 1, 100000]
let camera = new THREE.PerspectiveCamera(...arr)
camera.position.set(1, 1, 20)
camera.lookAt(scene.position)

// 环境光
const light = new THREE.AmbientLight(0x404040)
scene.add(light)
// 平行光
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
directionalLight.position.set(10, 10, 10)
// 2.设置光照投射阴影
directionalLight.castShadow = true
scene.add(directionalLight)

// 添加球体
const sphereGeometry = new THREE.SphereGeometry(1, 20, 20)
const material = new THREE.MeshStandardMaterial()
const sphere = new THREE.Mesh(sphereGeometry, material)
// 3.设置物体投射阴影
sphere.castShadow = true
scene.add(sphere)

// 添加平面
const planeGeometry = new THREE.PlaneGeometry(10, 10)
const plane = new THREE.Mesh(planeGeometry, material)
plane.position.set(0, -1, 0)
plane.rotation.x = -Math.PI / 2
// 4.接受阴影
plane.receiveShadow = true
scene.add(plane)

// 渲染器
let renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
// 1.设置渲染器开启阴影计算
renderer.shadowMap.enabled = true
document.body.appendChild(renderer.domElement)

// 控制器
new OrbitControls(camera, renderer.domElement)

// 辅助坐标
let axesHelper = new THREE.AxesHelper(25)
scene.add(axesHelper)

// 渲染函数
function render() {
  renderer.render(scene, camera)
  requestAnimationFrame(render)
}

render()
