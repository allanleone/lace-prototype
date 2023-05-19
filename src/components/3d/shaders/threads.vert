#pragma glslify: linePosition = require('./linePosition')
#pragma glslify: rotationMatrix = require('./rotation')
#pragma glslify: snoise = require(glsl-noise/classic/3d)

varying vec4 vColor;

attribute float positionUVS;
attribute float positionUVT;

uniform float uColorAmount;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform sampler2D defaultPositionTexture;
uniform sampler2D positionTexture;
uniform sampler2D prevPositionTexture;
uniform float uTime;
uniform float uKernelSize;
uniform float uNoiseAmount;
uniform float uNoiseSpeed;
uniform float uConcentricRatio;
uniform float uThickness;
uniform float uMoveToStart;
uniform float uInnerNoiseAmount;
uniform float uOuterNoiseAmount;
uniform float uPortalDepth;
uniform float uColorMix;

void main() {

	#include <begin_vertex>

	linePosition(positionUVS, positionUVT, positionTexture, prevPositionTexture, transformed, uMoveToStart, defaultPositionTexture);

    vec2 positionUV = vec2(positionUVS, positionUVT);

	vec4 positionData = texture2D(positionTexture, positionUV);

	// mat3 rotMat = rotationMatrix(vec3(0.0, 0.0, 1.0), positionUVT * 10.0);
	// transformed.xyz *= rotMat;

	transformed.xyz = mix(transformed.xyz, vec3(transformed.x, transformed.y, positionUVT), uPortalDepth);

	transformed.xyz = mix(transformed.xyz * positionUVT, transformed.xyz, uConcentricRatio);
	
	vec3 scaledPosition1 = vec3(transformed.x, transformed.y, transformed.z + (uTime * 0.5 * uNoiseSpeed)) * uKernelSize;
	vec3 scaledPosition2 = vec3(transformed.x, transformed.y, transformed.z + (uTime * 0.6 * uNoiseSpeed)) * uKernelSize * 3.0;
	vec3 scaledPosition3 = vec3(transformed.x, transformed.y, transformed.z + (uTime * 0.4 * uNoiseSpeed)) * uKernelSize * 0.5;

	scaledPosition2 += vec3(uTime * 0.3 * uNoiseSpeed);
	scaledPosition3 += vec3(uTime * 0.1 * uNoiseSpeed);

    float noiseX = snoise(scaledPosition1) * uNoiseAmount;
	float noiseY = snoise(scaledPosition2) * uNoiseAmount;
	float noiseZ = snoise(scaledPosition3) * uNoiseAmount;

	vec3 noisePos = transformed.xyz + vec3(noiseX, noiseY, noiseZ);

	// inner circles are noisier
    vec3 innerNoise = mix(noisePos, transformed.xyz, 0.1 + positionUVT * positionUVT);
	transformed.xyz = mix(transformed.xyz, innerNoise, uInnerNoiseAmount);

	// outert circles are noisier
    vec3 outerNoise = mix(transformed.xyz, noisePos, 0.1 + positionUVT * positionUVT);
	transformed.xyz = mix(transformed.xyz, outerNoise, uOuterNoiseAmount);
	
	vColor.rgb = mix(uColor1, uColor2, pow(positionUVT, uColorMix) );
	vColor.rgb = mix(vec3(1.0), vColor.rgb, uColorAmount );

	#include <project_vertex>

}
