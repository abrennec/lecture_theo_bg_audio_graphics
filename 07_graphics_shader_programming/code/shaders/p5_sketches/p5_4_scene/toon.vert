// Toon shader using per-pixel lighting. Based on the glsl 
// tutorial from lighthouse 3D:
// http://www.lighthouse3d.com/tutorials/glsl-tutorial/toon-shader-version-ii/
precision mediump float;

uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;
uniform mat3 uNormalMatrix;

// receive the lighting direction of up to 8 directional lights
uniform vec3 uLightingDirection[8];

attribute vec4 aPosition;
attribute vec3 aNormal;

varying vec3 vertNormal;
varying vec3 vertLightDir;

void main() {
  // Vertex in clip coordinates
  gl_Position = uProjectionMatrix * uModelViewMatrix * aPosition;
  
  // Transform the normal vector into eye coordinates so that it can be passed
  // to the fragment shader
  vertNormal = normalize(uNormalMatrix * aNormal);
  
  // Assuming that there is only one directional light (index at "0").
  // Its normal vector is passed to the fragment shader
  // in order to perform per-pixel lighting calculation.  
  vertLightDir = -uLightingDirection[0]; 
}