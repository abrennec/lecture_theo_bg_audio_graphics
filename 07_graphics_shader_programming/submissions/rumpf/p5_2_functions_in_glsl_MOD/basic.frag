
precision mediump float;


float map(float value, float min1, float max1, float min2, float max2) {
  return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
}

// unlike javascript, functions in glsl must have a return type specified as the first word of the function
// common return types are float, int, vec2, vec3, and vec4
vec4 addVec4(vec4 a, vec4 b){
  vec4 sum;
  sum = a + b;
  sum.x = map(sum.x, 0.0, 2.0, 0.0, 1.0);
  sum.y = map(sum.y, 0.0, 2.0, 0.0, 1.0);
  sum.z = map(sum.z, 0.0, 2.0, 0.0, 1.0);
  sum.w = map(sum.w, 0.0, 2.0, 0.0, 1.0);
  return sum;
}


void main() {

  // define two vec4's 
  // add them together using our function!
  // this is a silly function because we can easily add vec4s in glsl just using the + operator
  vec4 c1 = vec4(0.5, 0.5, 0.5, 0.5);
  vec4 c2 = vec4(0.5, 0.5, 0.5, 0.5);
0
  vec4 color = addVec4(c1, c2);

  // Would it be helpful to use the built-in function "T normalize(T x)" ?

  // normalizing the color vector would mean the vector would have a length of one. 
  // But to have the full brightness vec4(1.0, 1.0, 1.0, 1.0) the vector would need to have a length of 2 (squareroot of 4?), right?
  // so it doesn't help. Isn't it automatically clipping in a range from [0,1]?

  // How could you make use of built -in function "T sin(T angle)" ? 
  // sin can take a value from -1 to 1, so it could also somehow be used for mapping, something like ((sin(x)+1)/ 2) would map it to a range from 0 to 1, no?
  // don't know how to use it though?

  gl_FragColor = color;
}