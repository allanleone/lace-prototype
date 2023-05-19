#pragma glslify: curlNoise = require('./curlNoise');

varying vec2 vUv;

uniform sampler2D positionTexture;
uniform sampler2D defaultPositionTexture;
uniform float uTime;
uniform float uKernelSize;
uniform float uNoiseSpeed;
uniform float uNoiseAmount;
uniform float uTubeSegments;
uniform vec3 uMoveDir;
uniform float uMoveAmount;
uniform float uPrevPosBlendAmount;
uniform float uGlobalSpinFreq;
uniform float uGlobalSpinAmp;
uniform float uLocalSpinFreq;
uniform float uLocalSpinAmp;
uniform float uMoveToStart;

void main() {

  vec4 currentPosition;
  vec4 prevPosition;

  float UVDiv = 1.0 / uTubeSegments;

  vec4 defaultPosition = texture2D(defaultPositionTexture, vUv);

  if (uMoveToStart == 0.0) {

    if (vUv.x <= UVDiv) {
      currentPosition = texture2D(positionTexture, vUv);
      vec3 scaledPosition = vec3(currentPosition.x, currentPosition.y, currentPosition.z + (uTime * 0.5)) * uKernelSize;
      currentPosition.xyz += curlNoise(scaledPosition) * uNoiseSpeed * uNoiseAmount;
      currentPosition.xyz += normalize(uMoveDir) * uMoveAmount;
      currentPosition.xyz += vec3(sin(defaultPosition.a + uTime * uGlobalSpinFreq), cos(defaultPosition.a + uTime * uGlobalSpinFreq), 0.0) * uGlobalSpinAmp;
      currentPosition.xyz += vec3(sin(defaultPosition.a * uLocalSpinFreq + uTime * defaultPosition.a), cos(defaultPosition.a * uLocalSpinFreq + uTime * defaultPosition.a), 0.0) * uLocalSpinAmp;
      gl_FragColor = currentPosition;
    } else {
      vec4 prevPosition = texture2D(positionTexture, vUv);
      currentPosition = texture2D(positionTexture, vec2(vUv.x - UVDiv, vUv.y));
      gl_FragColor.xyz = mix(prevPosition.xyz, currentPosition.xyz, uPrevPosBlendAmount);
    }
  
  } else {

    vec3 dirVec = defaultPosition.xyz - texture2D(positionTexture, vUv).xyz;

    gl_FragColor.xyz = texture2D(positionTexture, vUv).xyz + dirVec * 0.01;

  }

}