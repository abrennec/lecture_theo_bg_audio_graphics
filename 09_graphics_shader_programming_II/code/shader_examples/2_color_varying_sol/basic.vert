
// p5.js attribute values 
attribute vec3 aPosition;       // the vertex position
attribute vec4 aVertexColor;    // a color value associated with the vertex
attribute vec2 aTexCoord;       // a texture coord associated with the vertex
attribute vec3 aNormal;         // a normal vector associated with the vertex

// Default p5.js uniforms available to both fragment and vertex shader
uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;
//uniform mat4 uModelMatrix;


uniform float scale;
uniform float time;

// Examples of varying variables passed from vertex to fragment shader
varying vec3 vPosition;
varying vec4 vColor;

// IMPORTANT - gl_Position
// all shaders have one main function
// the vertex shader requires there to be a vec4 output called gl_Position
void main() {
   
    // copy the position data into a vec4, using 1.0 as the w component
    vec4 positionVec4 = vec4(aPosition, 1.0);

    positionVec4.x *= (scale);// * sin(time * 0.05));

    // Setting varying values for the fragment shader
    // vPosition = aPosition;
    // vColor = aVertexColor;
    //vColor = vec4(aPosition, 1.0);

    //vec4 pos = vColor + vec4(aPosition, 1.0) * sin(time * 0.02);

    // send the vertex information on to the fragment shader
    //gl_Position = uProjectionMatrix * uModelViewMatrix * pos;
    gl_Position = uProjectionMatrix * uModelViewMatrix * positionVec4;
}