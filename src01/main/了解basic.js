import * as THREE from 'three'

// GOAL：了解three basic

// 1. 创建场景
const scene = new THREE.Scene()

// 2. 创建相机
const arr = [75, window.innerWidth / window.innerHeight, 0.1, 1000]
const camera = new THREE.PerspectiveCamera(...arr)
camera.position.set(0, 0, 10) // x y z
scene.add(camera)

// 添加物体
// 创建几何体
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
// 材质
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 })

// 根据几何体和材质创建物体
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)

// 将几何体添加到场景中
scene.add(cube)

// 初始化渲染器
const renderer = new THREE.WebGLRenderer()
// 设置渲染的尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight)
// console.log(renderer)

// 添加坐标辅助器
const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)

// 将webgl渲染的canvas内容添加到body上
document.body.appendChild(renderer.domElement)
// 使用渲染器，通过相机将场景渲染进来
renderer.render(scene, camera)
