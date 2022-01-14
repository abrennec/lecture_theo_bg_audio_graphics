// OpenGL/WebGL requires to specify the precision used to calculate color values 
// in the first line of the fragment shader. The precision depends on the device
// and graphics card used. You can switch between lowp, mediump, and highp.
precision mediump float;

// Every shader program has an input and output values. 
// The fragment shader output is stored in the gl_FragColor variable.
// gl_FragColor is of type vec4 which represents a 4D color value that stores red, green, blue, and alpha.

// Input values coming from the vertex shader with the help of varying variables.
varying vec4 vColor;
varying vec3 vPosition;

// IMPORTANT - gl_FragColor - the output of the fragment shader
// The fragment shader has one main function which is supposed to generate and set
// main output of the fragment shader, a variable called gl_FragColor. This variable
// will specify the fragment color per pixel. In between vertices, the color
// values are automatically interpolated so that the entire primitive is colored.
void main() {

  // lets just send the color red out
  // colors in shaders go from 0.0 to 1.0
  // glsl is very finicky about the decimal points 
  // gl_FragColor is a vec4 and is expecting red, green, blue, alpha
  // the line below will make a solid red color for every pixel of the primitive, with full alpha
  vec4 redColor = vec4(1.0, 0.0, 0.0, 1.0);

    
  //vec4 col = vColor;
  //col.x = vColor.x * sin(0.5);

  // assign redColor to be output to the screen
  gl_FragColor = redColor;
  //gl_FragColor = vColor;
  //gl_FragColor = col;

}