uniform float opacity;
uniform vec3 uColor1;

void main() {
	gl_FragColor = vec4(uColor1, opacity);
}