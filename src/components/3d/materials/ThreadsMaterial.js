import { ShaderLib, ShaderMaterial } from 'three'

// shaders
import vertexShader from '../shaders/threads.vert'
import fragmentShader from '../shaders/threads.frag'

export default class ThreadsMaterial extends ShaderMaterial {
  constructor (config) {
    super(config)

    this.type = 'ShaderMaterial'

    this.uniforms = ShaderLib.standard.uniforms

    this.uniforms.uTime = {
      type: 'f',
      value: 0
    }

    this.uniforms.uThickness = {
      type: 'f',
      value: null
    }

    this.uniforms.uConcentricRatio = {
      type: 'f',
      value: 0
    }

    this.uniforms.uNoiseSpeed = {
      type: 'f',
      value: 0
    }

    this.uniforms.uNoiseAmount = {
      type: 'f',
      value: 0
    }

    this.uniforms.uInnerNoiseAmount = {
      type: 'f',
      value: 0
    }

    this.uniforms.uOuterNoiseAmount = {
      type: 'f',
      value: 0
    }

    this.uniforms.uPortalDepth = {
      type: 'f',
      value: 0
    }

    this.uniforms.uColorMix = {
      type: 'f',
      value: 0
    }

    this.uniforms.uNoiseSpeed = {
      type: 'f',
      value: 0
    }

    this.uniforms.uKernelSize = {
      type: 'f',
      value: 0
    }

    this.uniforms.positionTexture = {
      type: 't',
      value: null
    }

    this.uniforms.prevPositionTexture = {
      type: 't',
      value: null
    }

    this.uniforms.defaultPositionTexture = {
      type: 't',
      value: null
    }

    this.uniforms.uColor1 = {
      type: 'v3',
      value: null
    }

    this.uniforms.uColor2 = {
      type: 'v3',
      value: null
    }

    this.uniforms.uColorAmount = {
      type: 'f',
      value: null
    }

    this.uniforms.uMoveToStart = {
      type: 'f',
      value: null
    }

    this.vertexShader = vertexShader
    this.fragmentShader = fragmentShader
  }
}
