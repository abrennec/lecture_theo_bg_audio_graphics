// Every shader program has an input and output values. 
// The vertex shader output is stored in the gl_Position variable. The 
// fragment shader output is stored in the gl_FragColor variable.

// Input values to both shader programs are specified by variable qualifiers.
// Input values can either be built-in variables that come with OpenGL/WebGL
//  like "attributes" (only available in the vertex shader) or
// "uniforms". Attributes and uniforms are both global variables. Attributes may 
// change per vertex (i.e., a position vector), whereas uniforms may change 
// per primitive (i.e., a matrix value).

// Additionally, shader programs support "varying" variables. These variables 
// can be used to carry information from vertex to fragment shader.


// p5.js attribute variables 
// These values are available only in the vertex shader, these values are specified 
// either explicitly by the developer in the application or implicitly by OpenGL / WebGL 
// using default values. In OpenGL/WebGL, you can specify these values directly in the code,
// whereas p5.js and many other programming toolkits abstract from the explicit commands
// and hide them in "easy" functions like, e.g., rect(...), fill(...), .. etc.
// Attribute variables are global variables sent to the shader by the sketch or the 
// underlying toolkit or library. Attributes are read only, they cannot be changed directly
// BUT they can be copied in a varying variable and be passed on to the fragment shader.
attribute vec3 aPosition;       // the vertex position
attribute vec4 aVertexColor;    // a color value associated with the vertex
attribute vec2 aTexCoord;       // a texture coord associated with the vertex
attribute vec3 aNormal;         // a normal vector associated with the vertex

// p5.js uniform variables available to both fragment and vertex shader.
// The following uniforms hold the transformation matrices that are central to 
// the rendering pipeline:
uniform mat4 uModelViewMatrix;      // transformation matrix to move from local to global to camera space
uniform mat4 uProjectionMatrix;     // transformation matrix that moves from camera to image plane
uniform mat3 uNormalMatrix;  


// IMPORTANT - gl_Position - the output of the vertex shader
// The vertex shader has one main function which is supposed to generate and set
// main output of the vertex shader, a variable called gl_Position. This variable
// will specify the vertex position in clip space, projected on the image plane.
void main() {
   
  // copy the position data into a vec4, using 1.0 as the w component
  vec4 positionVec4 = vec4(aPosition, 1.0);

  // scale the rect by two, and move it to the center of the screen
  // if we don't do this, it will appear with its bottom left corner in the center of the sketch
  // try commenting this line out to see what happens
  //positionVec4.xy = positionVec4.xy * 2.0 - 1.0;

  // Send the vertex information on to the fragment shader by specifying gl_Position.
  // gl_Position is defined in homogeneous coordinates (vec4) and in clip space.
  // Here, the vertex is sent to the fragment shader w/o any further matrix transformation. 
  // In some cases this may produce a visible result. However, whether a result is drawn
  // on the screen depends on the size and position of the geometry and the viewport 
  // settings and is thus not guaranteed..
  gl_Position = positionVec4;

  // This calcuation of gl_Position ensures that the vertex is actually transformed from
  // model-to-world-to-camera space (uModelViewMatrix) and is then projected to the
  // image plane in clip space (uProjectionMatrix)
  //gl_Position = uProjectionMatrix * uModelViewMatrix * positionVec4;
  //gl_Position = positionVec4 * uModelViewMatrix;
}