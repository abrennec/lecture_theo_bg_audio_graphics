precision mediump float;

// our vertex data
attribute vec3 aPosition;

uniform vec2 mouse;

// Default p5.js uniforms available to both fragment and vertex shader
uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

void main() {
  
  // copy the position data into a vec4, using 1.0 as the w component
  vec4 positionVec4 = vec4(aPosition, 1.0);

  positionVec4 = vec4(mouse.x * positionVec4.x *10.0, mouse.y * positionVec4.y * 10.0, 0.5, 1.0);
  
  // send the vertex information on to the fragment shader
  gl_Position = uProjectionMatrix * uModelViewMatrix * positionVec4;

  //positionVec4.xy = positionVec4.xy * 2.0 - 1.0;


  // send the vertex information on to the fragment shader
  //gl_Position = positionVec4;
}