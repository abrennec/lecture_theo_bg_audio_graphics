
precision mediump float;

#define PI 3.14

unifrom vec2 resolution;
uniform float time;

// Examples of variables passed from vertex to fragment shader
varying vec3 vPosition;


void main() {

    vec3 vPos = vPosition;
    vec4 cColor = vec4(normalize(vPos), 1.0);

    gl_FragColor = cColor;
}