
precision mediump float;


// Examples of variables passed from vertex to fragment shader
varying vec3 vPosition;


void main() {

    vec3 vPos = vPosition;
    //vec3 vPos = normalize(vPosition);
    vec4 cColor = vec4(vPos, 1.0);

    gl_FragColor = cColor;
}