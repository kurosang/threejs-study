import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
//GOAL：点光源

import * as dat from 'dat.gui'
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

// 创建一个小球
const smallBall = new THREE.Mesh(
  new THREE.SphereGeometry(0.1, 20, 20),
  new MeshBasicMaterial({ color: 0xff0000 })
)
smallBall.position.set(2, 2, 2)

// 环境光
const light = new THREE.AmbientLight(0x404040)
scene.add(light)
// 平行光
const pointLight = new THREE.PointLight(0xff0000, 1)
pointLight.position.set(2, 2, 2)
// 2.设置光照投射阴影
pointLight.castShadow = true

// 设置阴影贴图模糊度
pointLight.shadow.radius = 20
// 设置阴影帖度的分辨率，宽高
pointLight.shadow.mapSize.set(512, 512)

pointLight.decay = 0

// 把点光源绑定到小球上
smallBall.add(pointLight)

// 再把小球添加到场景里
scene.add(smallBall)

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
gui.add(pointLight, 'distance').min(0).max(5).step(0.01)
gui.add(pointLight, 'decay').min(0).max(1).step(0.01)

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
  let time = clock.getElapsedTime()
  smallBall.position.x = Math.sin(time) * 3 // 从-1到1 * 3
  smallBall.position.y = 2 + Math.sin(time * 10)
  smallBall.position.z = Math.cos(time) * 3
  controls.update()
  renderer.render(scene, camera)
  requestAnimationFrame(render)
}

render()
