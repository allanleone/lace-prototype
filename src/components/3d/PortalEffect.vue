<template>
    <!-- <div class="portal-effect">
        <span>portal 3d</span>
        <canvas ref="canvas"></canvas>
    </div> -->
</template>

<script>
// import { ref, onMounted, reactive, watch } from 'vue'
// import { gsap } from 'gsap'
// import { config } from './config.js'
// import * as THREE from 'three'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// export default {
//     name: 'PortalEffect',
//     setup() {
//         //
//         const canvas = ref(null)
//         const threads = []

//         onMounted(() => {
//             const renderer = new THREE.WebGLRenderer({ canvas: canvas.value, antialias: true })
//             renderer.setSize(window.innerWidth, window.innerHeight)
//             renderer.toneMapping = THREE.NoToneMapping

//             const camera = new THREE.PerspectiveCamera(
//                 config.camera.FOV,
//                 window.innerWidth / window.innerHeight,
//                 0.1,
//                 1000
//             )
//             camera.position.set(0, 0, 50)

//             const scene = new THREE.Scene()

//             // create threads
//             for (let i = 0; i < 10; i++) {
//                 let thread = new THREE.Mesh(
//                     new THREE.SphereGeometry(1, 32, 32),
//                     new THREE.MeshBasicMaterial({ color: 0xffffff })
//                 )
//                 thread.position.set(Math.random() * 40 - 20, Math.random() * 40 - 20, Math.random() * 40 - 20)
//                 scene.add(thread)
//                 threads.push(thread)
//             }

//             const controls = new OrbitControls(camera, canvas.value)

//             function animate() {
//                 for (let i = 0; i < threads.length; i++) {
//                     threads[i].position.x += 0.1
//                     if (threads[i].position.x > 20) {
//                         threads[i].position.x = -20
//                     }
//                 }
//                 requestAnimationFrame(animate)
//                 controls.update()
//                 renderer.render(scene, camera)
//             }

//             animate()
//         })

//         return {
//             canvas,
//         }
//         //
//     },
// }
</script>

<style>
/* .portal-effect {
    width: 100%;
    height: 100%;
    canvas {
        width: 100%;
        height: 100%;
    }
} */
</style>
