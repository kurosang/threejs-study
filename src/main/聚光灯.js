import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
//GOAL：聚光灯

import * as dat from 'dat.gui'

// 场景
let scene = new THREE.Scene()

// 相机
// 通过将参数抽离的方式，避免被格式化
let arr = [45, window.innerWidth / window.innerHeight, 1, 100000]
let camera = new THREE.PerspectiveCamera(...arr)
camera.position.set(1, 1, 20)
camera.lookAt(scene.position)

// 添加球体
const sphereGeometry = new THREE.SphereGeometry(1, 20, 20)
const material = new THREE.MeshStandardMaterial()
const sphere = new THREE.Mesh(sphereGeometry, material)
// 3.设置物体投射阴影
sphere.castShadow = true
scene.add(sphere)

// 添加平面
const planeGeometry = new THREE.PlaneGeometry(30, 30)
const plane = new THREE.Mesh(planeGeometry, material)
plane.position.set(0, -1, 0)
plane.rotation.x = -Math.PI / 2
// 4.接受阴影
plane.receiveShadow = true
scene.add(plane)

// 环境光
const light = new THREE.AmbientLight(0x404040)
scene.add(light)
// 平行光
const spotLight = new THREE.SpotLight(0xffffff, 1)
spotLight.position.set(5, 5, 5)
// 2.设置光照投射阴影
spotLight.castShadow = true

spotLight.intensity = 2

// 设置阴影贴图模糊度
spotLight.shadow.radius = 20
// 设置阴影帖度的分辨率，宽高
spotLight.shadow.mapSize.set(4096, 4096)
// 设置聚光灯的目标
spotLight.target = sphere
// 设置聚光灯角度，灯光散开的角度
spotLight.angle = Math.PI / 10
// 从光源发出光的最大距离，其强度根据光源的距离线性衰减。
spotLight.distance = 0
// 聚光锥的半影衰减百分比。在0和1之间的值。默认为0。
spotLight.penumbra = 0
// 沿着光照距离的衰减量 !!!要设置渲染器，因为无力
spotLight.decay = 1

// 设置透视投射相机的属性

scene.add(spotLight)

// 添加gui
const gui = new dat.GUI()
gui
  .add(sphere.position, 'x')
  .min(-10)
  .max(10)
  .step(0.01)
  .name('X轴')
  .onChange((v) => {
    console.log('值被修改', v)
  })
  .onFinishChange((v) => {
    console.log('onFinishChange完全停下来', v)
  })
gui
  .add(spotLight, 'angle')
  .min(0)
  .max(Math.PI / 2)
  .step(0.01)
  .name('角度')
gui
  .add(spotLight, 'distance')
  .min(0)
  .max(10)
  .step(0.01)
  .name('从光源发出光的最大距离')
gui
  .add(spotLight, 'penumbra')
  .min(0)
  .max(1)
  .step(0.01)
  .name('聚光锥的半影衰减百分比')
gui
  .add(spotLight, 'decay')
  .min(0)
  .max(5)
  .step(0.01)
  .name('沿着光照距离的衰减量')

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

// 渲染函数
function render() {
  renderer.render(scene, camera)
  requestAnimationFrame(render)
}

render()
