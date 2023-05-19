import {
  DataTexture,
  RGBAFormat,
  FloatType,
  Vector3,
  NearestFilter
} from 'three'

export default class TextureHelper {
  constructor (args) {
    this.setTextureSize(args.itemCount, args.width, args.height)
  }

  setTextureSize (itemCount, width, height) {
    this.itemCount = itemCount
    this.textureHeight = height
    this.textureWidth = width
  }

  concentricCircles (textureArray) {
    let i = 0
    const innerRadius = 1
    for (let y = 0; y < this.itemCount; y++) {
      // let angle = Math.random() * (Math.PI * 2)
      // let angle = y * 1
      let angle = 0.0

      for (let x = 0; x < this.textureWidth; x++) {
        angle += ((Math.PI * 2) / (this.textureWidth - 1))
        // const radius = innerRadius + i * 0.1
        const radius = innerRadius
        const position = new Vector3(
          Math.cos(angle) * radius,
          Math.sin(angle) * radius,
          // Math.log(i)
          // y * 0.03
          // y * 0.01
          0
        )

        textureArray[(i + x) * 4 + 0] = position.x
        textureArray[(i + x) * 4 + 1] = position.y
        textureArray[(i + x) * 4 + 2] = position.z
        textureArray[(i + x) * 4 + 3] = y * 0.8
      }

      i += this.textureWidth
    }

    return textureArray
  }

  steppedCircle (textureArray) {
    let ii = 0
    const radius = 2
    for (let i = 0; i < this.itemCount; i++) {
      // const angle = Math.random() * Math.PI * 2 // random points on circle
      const angle = ((Math.PI * 2) / this.itemCount) * i

      const position = new Vector3(
        ((Math.cos(angle) * radius)),
        ((Math.sin(angle) * radius)),
        0
      )

      for (let j = 0; j < this.textureWidth; j++) {
        textureArray[(ii + j) * 4 + 0] = position.x
        textureArray[(ii + j) * 4 + 1] = position.y
        textureArray[(ii + j) * 4 + 2] = position.z
        textureArray[(ii + j) * 4 + 3] = i * 0.8
      }

      ii += this.textureWidth
    }

    return textureArray
  }

  createPositionTexture () {
    const textureArray = new Float32Array(this.textureWidth * this.textureHeight * 4)

    this.concentricCircles(textureArray)
    // this.steppedCircle(textureArray)

    const positionTexture = new DataTexture(
      textureArray,
      this.textureWidth,
      this.textureHeight,
      RGBAFormat,
      FloatType
    )
    positionTexture.minFilter = NearestFilter
    positionTexture.magFilter = NearestFilter
    positionTexture.generateMipmaps = false
    positionTexture.needsUpdate = true

    return {
      positionTexture
    }
  }
}
