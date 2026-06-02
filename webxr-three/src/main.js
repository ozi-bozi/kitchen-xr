import * as THREE from 'three'
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js'

const scene = new THREE.Scene()
scene.background = new THREE.Color(0x202025)

const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 100)
camera.position.set(0, 1.6, 3)

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.xr.enabled = true
document.body.appendChild(renderer.domElement)
document.body.appendChild(VRButton.createButton(renderer))

// תאורה
const light = new THREE.HemisphereLight(0xffffff, 0x444444, 1)
scene.add(light)

// קובייה
const box = new THREE.Mesh(
  new THREE.BoxGeometry(0.4, 0.4, 0.4),
  new THREE.MeshStandardMaterial()
)
box.position.set(0, 1.6, -1)
scene.add(box)

// רצפה
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(10, 10),
  new THREE.MeshStandardMaterial({ roughness: 1 })
)
floor.rotation.x = -Math.PI / 2
scene.add(floor)

renderer.setAnimationLoop(() => {
  box.rotation.y += 0.01
  renderer.render(scene, camera)
})

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})
