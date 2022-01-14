// OpenGL/WebGL requires to specify the precision used to calculate color values 
// in the first line of the fragment shader. The precision depends on the device
// and graphics card used. You can switch between lowp, mediump, and highp.
precision mediump float;

varying vec4 vColor;

uniform float time;

void main() {

    //vec4 redColor = vec4(1.0, 0.0, 0.0, 1.0);

    vec4 cColor = vColor;
    cColor.x = (sin(time * 0.1)+ 1.0)/2.0;
    gl_FragColor = cColor;
}