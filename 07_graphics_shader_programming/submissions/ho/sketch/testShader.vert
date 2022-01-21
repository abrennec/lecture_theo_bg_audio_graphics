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

    // Frequency and Amplitude will determine the look of the displacement
    float frequency = 120.0;
    float amplitude = 0.9;

    // Displace the x position withe the sine of the x + time. Multiply by the normal to move it in the correct direction
    // You could add more distortions to the other axes too. 
    float distortion = sin(positionVec4.x * frequency + uFrameCount * 0.6);
    positionVec4.y += distortion * aNormal.x * amplitude;


    positionVec4.x += sin(uFrameCount * 2.0);
    gl_Position = uProjectionMatrix * uModelViewMatrix * positionVec4;
}