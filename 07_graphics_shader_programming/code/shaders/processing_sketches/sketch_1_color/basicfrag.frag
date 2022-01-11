
precision mediump float;

// Input values coming from the vertex shader with the help of varying variables.
// In newer versions of GLSL you can use "in" instead of "varying"
//varying vec4 vColor;
//varying vec3 vPosition;

varying vec4 vcolor;


void main() {

  vec4 redColor = vec4(1.0, 0.0, 0.0, 1.0);

  // assign redColor to be output to the screen
  gl_FragColor = redColor;
  gl_FragColor = vcolor; 
}