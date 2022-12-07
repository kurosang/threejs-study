import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
//GOAL： 平行光阴影属性与阴影相机原理

import * as dat from 'dat.gui'

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

// 设置阴影贴图模糊度
directionalLight.shadow.radius = 20
// 设置阴影帖度的分辨率，宽高
directionalLight.shadow.mapSize.set(4096, 4096)

// 设置平行光投射相机的属性(近端、远端、四个面)
directionalLight.shadow.camera.near = 0.5
directionalLight.shadow.camera.far = 500
directionalLight.shadow.camera.top = 5
directionalLight.shadow.camera.bottom = -5
directionalLight.shadow.camera.left = -5
directionalLight.shadow.camera.right = 5

scene.add(directionalLight)

// 添加gui
const gui = new dat.GUI()
gui
  .add(directionalLight.shadow.camera, 'near')
  .min(0)
  .max(20)
  .step(0.01)
  .name('X轴')
  .onChange((v) => {
    console.log('值被修改', v)
    // 每次修改之后都要更新矩阵
    directionalLight.shadow.camera.updateProjectionMatrix()
  })
  .onFinishChange((v) => {
    console.log('onFinishChange完全停下来', v)
  })

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
