precision mediump float;

uniform mat4 transform;

attribute vec4 vertex;       // the vertex position
attribute vec4 color;

varying vec4 vcolor;

void main() {
   
  vcolor = color;

  gl_Position = transform * vertex;

}
