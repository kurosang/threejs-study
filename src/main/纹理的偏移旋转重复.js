import * as THREE from 'three'
// 导入 轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import gsap from 'gsap'

// GOAL：纹理的偏移旋转重复

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

//导入纹理，本质加载图片
const textureLoader = new THREE.TextureLoader()
const texture = textureLoader.load('./images/texture.jpeg')

// 设置纹理偏移
// texture.offset.x = 0.5;
// texture.offset.y = 0.5;
// texture.offset.set(0.5, 0.5);

// 设置纹理旋转
//设置旋转点，默认左下角0,0
// texture.center.set(0.5, 0.5);
// // 旋转45度
// texture.rotation = Math.PI / 4;

// 设置纹理的重复
texture.repeat.set(2, 3)
// 设置纹理重复的模式
// .wrapS : number
// This defines how the texture is wrapped horizontally and corresponds to U in UV mapping.
// The default is THREE.ClampToEdgeWrapping, where the edge is clamped to the outer edge texels. The other two choices are THREE.RepeatWrapping and THREE.MirroredRepeatWrapping. See the texture constants page for details.
texture.wrapS = THREE.RepeatWrapping
texture.wrapT = THREE.MirroredRepeatWrapping

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
