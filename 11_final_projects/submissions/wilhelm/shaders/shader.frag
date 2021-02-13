// webgl requires that the first line of the fragment shader specify the precision
// precision is dependent on device, but higher precision variables have more zeros
// sometimes you'll see bugs if you use lowp so stick to mediump or highp
precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;
uniform float u_fft;
uniform sampler2D u_depth;

void main() {

  vec2 coords = gl_FragCoord.xy / u_resolution.xy;
  vec4 texture = texture2D(u_depth, coords);
  vec4 c_main = vec4(1.0);
  vec4 c_depth = vec4(texture.r, texture.g * u_fft, texture.b * u_fft, texture.a);

  // assign redColor to be output to the screen
  gl_FragColor = vec4( max(c_main.r, c_depth.r), min(c_main.g, c_depth.g), min(c_main.b, c_depth.b), 1.0);
}