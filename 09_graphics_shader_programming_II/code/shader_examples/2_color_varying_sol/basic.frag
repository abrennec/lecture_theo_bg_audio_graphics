// OpenGL/WebGL requires to specify the precision used to calculate color values 
// in the first line of the fragment shader. The precision depends on the device
// and graphics card used. You can switch between lowp, mediump, and highp.
precision mediump float;


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


// IMPORTANT - gl_FragColor - the output of the fragment shader
// The fragment shader has one main function which is supposed to generate and set
// main output of the fragment shader, a variable called gl_FragColor. This variable
// will specify the fragment color per vertex. In between vertices, the color
// values are automatically interpolated so that the entire primitive is colored.


// Examples of variables passed from vertex to fragment shader
varying vec3 vPosition;
varying vec4 vColor;

//uniform float time;

void main() {

    vec4 redColor = vec4(1.0, 0.0, 0.0, 1.0);

    //vec4 cColor = vColor;
    //cColor.xy = vPosition.xy * sin(time * 0.02);
    // Fragment shaders set the gl_FragColor, which is a vector4 of
    // ( red, green, blue, alpha ).
    //gl_FragColor = redColor;
    gl_FragColor = vColor;
}