import * as THREE from 'three'
// 导入 轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// GOAL：认识材质和纹理

// 1. 创建场景
const scene = new THREE.Scene()

// 2. 创建相机
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)
camera.position.set(0, 0, 10)
scene.add(camera)

const colorImg = require('../assets/textures/door/color.jpg')

//导入纹理，本质加载图片
const textureLoader = new THREE.TextureLoader()
const texture = textureLoader.load(colorImg)

// 添加物体
// 创建几何体
const cubeGeo = new THREE.BoxGeometry(5, 5, 5)
const basicMaterial = new THREE.MeshBasicMaterial({
  color: '#ffffff',
  map: texture,
})
const cube = new THREE.Mesh(cubeGeo, basicMaterial)
scene.add(cube)

// 初始化渲染器
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true

function animate() {
  controls.update()
  renderer.render(scene, camera)
  requestAnimationFrame(animate)
}
animate()
