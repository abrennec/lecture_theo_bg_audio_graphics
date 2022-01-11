
precision mediump float;


// unlike javascript, functions in glsl must have a return type specified as the first word of the function
// common return types are float, int, vec2, vec3, and vec4
vec4 addVec4(vec4 a, vec4 b){
  vec4 sum;
  sum = a + b;
  return sum;
}


void main() {

  // define two vec4's 
  // add them together using our function!
  // this is a silly function because we can easily add vec4s in glsl just using the + operator
  vec4 c1 = vec4(1.0, 0.2, 0.44, 0.5);
  vec4 c2 = vec4(-0.2, 0.4, 0.41, 0.5);

  vec4 color = addVec4(c1, c2);

  // Would it be helpful to use the built-in function "T normalize(T x)" ?
  // How could you make use of built -in function "T sin(T angle)" ? 

  gl_FragColor = color;
}