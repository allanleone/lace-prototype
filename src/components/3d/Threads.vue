

<script>

// // core
// import { ref, onMounted, reactive, watch } from 'vue'
// import { gsap } from 'gsap'
// import { config } from './config.js'
// import * as THREE from 'three'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// // shaders
// import PassThroughVert from '../shaders/passThrough.vert'
// import PassThroughFrag from '../shaders/passThrough.frag'
// import threadsAdrenoShader from '../shaders/threadsAdreno.frag'

// // helpers
// import TextureHelper from '../helpers/TextureHelper'

// // materials
// import ThreadsMaterial from '../materials/ThreadsMaterial'
// import PositionMaterial from '../materials/PositionMaterial'

// // default values
// const INSTANCE_COUNT = config.threads.instanceCount
// const TUBE_SEGMENTS = config.threads.segments
// const RADIUS_SEGMENTS = config.threads.radiusSegments



// export default {
//     name: 'App',
//     setup() {
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

//             const color1 = reactive(new Vector3())
//             const color2 = reactive(new Vector3())
//             const textureHelper = reactive(
//                 new TextureHelper({
//                     itemCount: INSTANCE_COUNT,
//                     width: TUBE_SEGMENTS,
//                     height: INSTANCE_COUNT
//                 })
//             )
//             const frame = reactive(0)
//             const tubeMesh = reactive(null)
//             const tubeGeometry = reactive(null)
//             const tubeMaterial = reactive(null)
//             const quadCamera = reactive(null)
//             const passThroughScene = reactive(null)
//             const passThroughMaterial = reactive(null)
//             const positionRenderTarget1 = reactive(null)
//             const positionRenderTarget2 = reactive(null)
//             const outputPositionRenderTarget = reactive(null)
//             const positionMaterial = reactive(null)
//             const positionData = reactive(null)
//             const defaultPositionTexture = reactive(null)
//             const positionScene = reactive(null)
//             const positionMesh = reactive(null)
//             const isScrolling = reactive(false)
//             const scrollTimeout = reactive(null)
//             const tl = reactive(gsap.timeline({}))

//             const presets = config.presets

//             const params = reactive({
//                 updateOnScroll: false,
//                 paused: false,
//                 uColor1: '#fce197',
//                 uColor2: '#ffb3ef',
//                 uColorAmount: 1.0,
//                 uKernelSizeWorld: 0.66,
//                 uNoiseAmountWorld: 0.0,
//                 uInnerNoiseAmount: 1.0,
//                 uOuterNoiseAmount: 1.0,
//                 uPortalDepth: 0.0,
//                 uColorMix: 5.0,
//                 uNoiseSpeedWorld: 0.1,
//                 uConcentricRatio:
//             })

//             useEffect(() => {
//                 color1.current = new Color(params.uColor1)
//                 color2.current = new Color(params.uColor2)

//                 initMaterials()
//                 initCamera()
//                 initPassThrough()
//                 initRenderTargets()
//                 initPositions()
//                 buildGeometry()
//                 buildMesh()

//                 return () => {
//                     scene.remove(tubeMesh.current)
//                     tubeGeometry.current.dispose()
//                     tubeMaterial.current.dispose()
//                     positionRenderTarget1.current.dispose()
//                     positionRenderTarget2.current.dispose()
//                     outputPositionRenderTarget.current.dispose()
//                     defaultPositionTexture.current.dispose()
//                     positionData.current.dispose()
//                 }
//             }, [])

//             useFrame(({ clock }) => {
//                 const time = clock.elapsedTime

//                 // Update uniforms
//                 tubeMaterial.current.uniforms.uColor1.value = color1.current
//                 tubeMaterial.current.uniforms.uColor2.value = color2.current
//                 tubeMaterial.current.uniforms.uColorAmount.value = params.uColorAmount
//                 tubeMaterial.current.uniforms.uKernelSizeWorld.value = params.uKernelSizeWorld
//                 tubeMaterial.current.uniforms.uNoiseAmountWorld.value = params.uNoiseAmountWorld
//                 tubeMaterial.current.uniforms.uInnerNoiseAmount.value = params.uInnerNoiseAmount
//                 tubeMaterial.current.uniforms.uOuterNoiseAmount.value = params.uOuterNoiseAmount
//                 tubeMaterial.current.uniforms.uPortalDepth.value = params.uPortalDepth
//                 tubeMaterial.current.uniforms.uColorMix.value = params.uColorMix
//                 tubeMaterial.current.uniforms.uNoiseSpeedWorld.value = params.uNoiseSpeedWorld
//                 tubeMaterial.current.uniforms.uNoiseSpeed.value = params.uNoiseSpeed
//                 tubeMaterial.current.uniforms.uKernelSize.value = params.uKernelSize
//                 tubeMaterial.current.uniforms.uNoiseAmount.value = params.uNoiseAmount
//                 tubeMaterial.current.uniforms.uMoveDir.value = new Vector3(params.uMoveDir.x, params.uMoveDir.y, params.uMoveDir.z)
//                 tubeMaterial.current.uniforms.uMoveAmount.value = params.uMoveAmount
//                 tubeMaterial.current.uniforms.uPrevPosBlendAmount.value = params.uPrevPosBlendAmount
//                 tubeMaterial.current.uniforms.uGlobalSpinFreq.value = params.uGlobalSpinFreq
//                 tubeMaterial.current.uniforms.uGlobalSpinAmp.value = params.uGlobalSpinAmp
//                 tubeMaterial.current.uniforms.uMoveToStart.value = params.uMoveToStart

//                 // Update position material uniforms
//                 positionMaterial.current.uniforms.uTime.value = time

//                 // Update positions
//                 if (!params.paused) {
//                     if (params.updateOnScroll) {
//                         // Update positions only when scrolling
//                         if (!isScrolling.current) {
//                             isScrolling.current = true
//                             tl.current.clear()
//                             tl.current.to(positionMaterial.current.uniforms.uTime, { value: time + 0.5, duration: 0.5 })
//                                 .eventCallback('onComplete', () => {
//                                     isScrolling.current = false
//                                 })
//                         }
//                     } else {
//                         updatePositions()
//                     }
//                 }

//                 frame.current++
//             })

//             // for (let i = 0; i < 10; i++) {
//             //     let thread = new THREE.Mesh(
//             //         new THREE.SphereGeometry(1, 32, 32),
//             //         new THREE.MeshBasicMaterial({ color: 0xffffff })
//             //     )
//             //     thread.position.set(Math.random() * 40 - 20, Math.random() * 40 - 20, Math.random() * 40 - 20)
//             //     scene.add(thread)
//             //     threads.push(thread)
//             // }


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
//     },
// }
</script>

<style scoped>
/* .portal-effect {
    width: 100%;
    height: 100%;

    canvas {
        width: 100%;
        height: 100%;
        background-color: #99999933;
    }
} */
</style>
