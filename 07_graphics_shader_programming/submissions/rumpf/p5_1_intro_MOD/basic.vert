precision mediump float;


uniform mat4 uModelViewMatrix;      // transformation matrix to move from local to global to camera space
uniform mat4 uProjectionMatrix;     // transformation matrix that moves from camera to image plane

attribute vec3 aPosition;       // the vertex position
attribute vec4 aVertexColor;

varying vec4 vColor;


void main() {

  
  // copy the position data into a vec4, using 1.0 as the w component
  vec4 positionVec4 = vec4(aPosition, 1.0);

  vColor = aVertexColor;
  
  positionVec4.xy = positionVec4.xy * 2.0 - 1.0;
  positionVec4 = uProjectionMatrix * uModelViewMatrix * positionVec4;
  gl_Position = positionVec4;
}
