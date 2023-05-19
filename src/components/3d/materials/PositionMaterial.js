import { ShaderMaterial } from 'three'

import { config } from '../config'

import PassThroughVert from '../shaders/passThrough.vert'
import PositionFrag from '../shaders/position.frag'

export default class PositionMaterial extends ShaderMaterial {
  constructor (args) {
    super(args)

    this.type = 'ShaderMaterial'

    this.uniforms.uTime = {
      type: 'f',
      value: 0.0
    }

    this.uniforms.positionTexture = {
      type: 't',
      value: null
    }

    this.uniforms.defaultPositionTexture = {
      type: 't',
      value: null
    }

    this.uniforms.uNoiseSpeed = {
      type: 'f',
      value: 0
    }

    this.uniforms.uKernelSize = {
      type: 'f',
      value: 0
    }

    this.uniforms.uNoiseAmount = {
      type: 'f',
      value: 0
    }

    this.uniforms.uMoveDir = {
      type: 'v3',
      value: 0
    }

    this.uniforms.uMoveAmount = {
      type: 'f',
      value: 0
    }
    this.uniforms.uPrevPosBlendAmount = {
      type: 'f',
      value: 0
    }
    this.uniforms.uGlobalSpinFreq = {
      type: 'f',
      value: 0
    }
    this.uniforms.uGlobalSpinAmp = {
      type: 'f',
      value: 0
    }
    this.uniforms.uLocalSpinFreq = {
      type: 'f',
      value: 0
    }
    this.uniforms.uLocalSpinAmp = {
      type: 'f',
      value: 0
    }
    this.uniforms.uMoveToStart = {
      type: 'f',
      value: 0
    }
    this.uniforms.uTubeSegments = {
      type: 'f',
      value: config.threads.segments
    }

    this.vertexShader = PassThroughVert
    this.fragmentShader = PositionFrag
  }
}
