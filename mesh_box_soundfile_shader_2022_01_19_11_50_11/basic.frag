//#version 300 es
precision mediump float;


// This varying variable has already been declared and defined
// in the vertex shader and serves as an input value to the fragment shader.
varying vec4 vColor;
uniform float time;

void main() {
  
  vec4 customColor = vec4(sin(time), 0.0, 1.0, 1.0);
  //vec4 customColor = vec4(1.0, 0.0, 0.75, 1.0);

  // gL_FragColor MUST be set in the fragment shader
  
  // assign the color to the pixel of the current fragment
  gl_FragColor = customColor; 
  
  // assign the color specified in the application sketch.
  //gl_FragColor = vColor; 
}
