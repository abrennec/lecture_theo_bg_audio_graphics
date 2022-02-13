//#version 300 es
precision mediump float;


attribute vec3 aPosition;
attribute vec4 aVertexColor;

uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

varying vec4 vColor;

uniform float time;
uniform float scale;
uniform float ytransform;

void main() {

  vColor = aVertexColor;
  
  vec4 positionVec4 = vec4(aPosition, 1.0);

  // This calculation does not transform the vertex from world coordinates into
  // clip space but simply scales and moves the vertex coordinate in clip space
  //positionVec4.xy = positionVec4.xy * 2.0 - 1.0;
  
  positionVec4.xy *= scale;
  //positionVec4.xy *= sin(0.2 * time);
  positionVec4.y += cos(time * scale) * ytransform;

  
  vec4 transformedVertex = 
    uProjectionMatrix * uModelViewMatrix * positionVec4;
  
  //gl_Position = positionVec4; 
  gl_Position = transformedVertex;

}
