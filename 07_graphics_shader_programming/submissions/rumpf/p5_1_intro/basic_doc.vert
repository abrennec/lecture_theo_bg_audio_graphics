// OpenGL/WebGL requires to specify the precision used to calculate color values 
// in the first line of the fragment shader. The precision depends on the device
// and graphics card used. You can switch between lowp, mediump, and highp.
precision mediump float;

// Every shader program has an input and output values. 
// The vertex shader output is stored in the gl_Position variable. 

// gl_Position is of type vec4 which represents a 3D vector in homogeneous coords.

// Shaders work with variable type qualifiers:
// "attribute" (only available in the vertex shader, read-only)
// "uniform"
// "varying"

// Attributes and uniforms are both global variables. Attributes may change per
// vertex (i.e., a position vector), whereas uniforms may change per primitive
// (i.e., a matrix value). Varying variables can be used to carry information
// from vertex to fragment shader.


// p5.js attribute variables 
// Attribute values are available only in the vertex shader, these values are specified 
// either explicitly by the developer in the application or implicitly by OpenGL / WebGL / p5 / Processing 
// using default values. In OpenGL/WebGL, you can specify these values directly in the code,
// whereas p5.js and many other programming toolkits abstract from the explicit commands
// and hide them in "easy" functions (similarly to using rect(...), ellipse(...), .. etc.).
// Attribute variables are global variables sent to the shader by the sketch or the 
// underlying toolkit or library. Attributes are read only, they cannot be changed directly
// BUT they can be copied in a varying variable and be passed on to the fragment shader.
attribute vec3 aPosition;       // the vertex position
attribute vec4 aVertexColor;    // a color value associated with the vertex
//attribute vec2 aTexCoord;       // a texture coord associated with the vertex
//attribute vec3 aNormal;         // a normal vector associated with the vertex

// p5.js uniform variables available to both fragment and vertex shader. They can be specified
// in the p5 and processing sketch using setUniform(...). BUT there are also pre-defined uniforms such as
// the following uniforms which hold the transformation matrices that are central to 
// the rendering pipeline:
uniform mat4 uModelViewMatrix;      // transformation matrix to move from local to global to camera space
uniform mat4 uProjectionMatrix;     // transformation matrix that moves from camera to image plane

// Varying variables are specified in the shader programs only and not in the application or sketch.
varying vec4 vColor;
varying vec3 vPosition;


// IMPORTANT - gl_Position - the output of the vertex shader
// The vertex shader has one main function which is supposed to generate and set
// main output of the vertex shader, a variable called gl_Position. This variable
// specifies the vertex position in clip space, i.e., ranging from -1.0 to 1.0 only.
void main() {
   
  // copy the position data into a vec4, using 1.0 as the w component
  vec4 positionVec4 = vec4(aPosition, 1.0);

    vColor = aVertexColor;
    vPosition = aPosition;
  // scale the rect by two, and move it to the center of the screen
  // if we don't do this, it will appear with its bottom left corner in the center of the sketch
  // try commenting this line out to see what happens
  positionVec4.xy = positionVec4.xy * 2.0 - 1.0;

  // Send the vertex information on to the fragment shader by specifying gl_Position.
  // gl_Position is defined in homogeneous coordinates (vec4) in clip space.
  // Here, the vertex is sent to the fragment shader w/o any further matrix transformation. 
  // In some cases this may produce a visible result. However, whether a result is drawn
  // on the screen depends on the size and position of the geometry and the viewport 
  // settings and is thus not guaranteed..
  gl_Position = positionVec4;

  // This calcuation of gl_Position ensures that the vertex is actually transformed from
  // model-to-world-to-camera space (uModelViewMatrix) and is then projected to the
  // image plane in clip space (uProjectionMatrix)
  //gl_Position = uProjectionMatrix * uModelViewMatrix * positionVec4;
}

