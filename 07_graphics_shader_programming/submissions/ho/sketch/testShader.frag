precision mediump float;

varying vec3 vNormal;

void main() {
    vec3 color = vNormal * - 1.0 + 0.5;

    gl_FragColor = vec4(color.x, 0.2, color.y , 1.0);
}