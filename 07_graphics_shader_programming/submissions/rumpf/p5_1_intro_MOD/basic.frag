precision mediump float;

varying vec4 vColor;

void main() {

  //vec4 customColor = vec4(1, 0, 0, 1);

  vec4 col = vColor;
  //assign redColor to be output to the screen
  //gl_FragColor = customColor;

    gl_FragColor = col;
}
