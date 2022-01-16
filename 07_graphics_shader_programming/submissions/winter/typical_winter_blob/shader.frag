precision highp float;

uniform float uBrightnessAnimation;
uniform float uSaturationAnimation;

varying vec2 vTexCoord;

// Get the normal from the vertex shader
varying vec3 vNormal;

void main() {
  
  // Normalize the normal
  vec3 color = vNormal*uSaturationAnimation+uBrightnessAnimation;
  
  // Lets just draw the texcoords to the screen
  gl_FragColor = vec4(color ,1.0);
}