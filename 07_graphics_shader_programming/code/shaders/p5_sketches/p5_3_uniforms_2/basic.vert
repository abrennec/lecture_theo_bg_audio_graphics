
// p5.js attribute values 
attribute vec3 aPosition;       // the vertex position
attribute vec4 aVertexColor;    // a color value associated with the vertex

// Default p5.js uniforms available to both fragment and vertex shader
uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

uniform float posX;
uniform float posY; // not yet used => how can you use this variable to translate the object in y direction?

varying vec4 vColor;

vec4 posChange = vec4(100,0,0,0);

void main() {
   
    // copy the position data into a vec4, using 1.0 as the w component
    vec4 positionVec4 = vec4(aPosition, 1.0);

    vColor = aVertexColor;

    positionVec4.x *= posX; // scale the object
    positionVec4 += posChange; // translate the object

    gl_Position = uProjectionMatrix * uModelViewMatrix * positionVec4;
}