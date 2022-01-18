precision mediump float;

varying vec2 vTexCoord;

// Get the normal from the vertex shader
varying vec3 vNormal;

// Get the framecount uniform
uniform float uFrameCount;


void main() {
  
  // Normalize the normal
  
  vec3 color = vNormal;

  color.x = sin(uFrameCount * 0.03 * color.x) * 0.5 + 0.5;
  color.y = sin(uFrameCount * 0.09 * color.y) * 0.1 + 0.9;
  color.y = sin(uFrameCount * 0.27 * color.z) * 0.5 + 0.5;
  
  /*
 vec3 color = vec3(vTexCoord, 1.0);
  
  color.x = (sin(uFrameCount * 0.1 * color.x) * 0.5 + 0.5);
  color.y = (sin(uFrameCount * 0.2 * color.y) * 0.5 + 0.5);
  */
  
  // Lets just draw the texcoords to the screen
  gl_FragColor = vec4(color ,1.0);
}