//get the position value of each vertex
attribute vec3 aPosition;

//get the projection matrix for converting to screen coordinates
uniform mat4 uProjectionMatrix;

//get the combined view and model matrixes that transform local projection to world projection
uniform mat4 uModelViewMatrix;

//get the framecount from the sketch.js
uniform float uFrameCount;

varying vec3 vNormal;
attribute vec3 aNormal;

void main() {

    //set w to 1.0
    vec4 positionVec4 = vec4(aPosition, 1.0);

    vNormal = aNormal;

    positionVec4.x += sin(uFrameCount * 2.0);
    gl_Position = uProjectionMatrix * uModelViewMatrix * positionVec4;
}