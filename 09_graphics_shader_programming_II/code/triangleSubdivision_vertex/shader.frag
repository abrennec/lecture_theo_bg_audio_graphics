precision mediump float;

varying vec2 vTexCoord;

// Get the normal from the vertex shader
varying vec3 vNormal;

varying float testVar;


float random (vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}

void main() {
  vec2 u_resolution = vec2(800.0, 800.0);
  vec2 st = gl_FragCoord.xy/u_resolution.xy;

  //st *= 10.0; // Scale the coordinate system by 10
  vec2 ipos = floor(st);  // get the integer coords
  vec2 fpos = fract(st);  // get the fractional coords

  // Assign a random value based on the integer coord
  //vec3 color = vec3(random( ipos ));

  // Uncomment to see the subdivided grid
  vec3 color = vec3(fpos,0.0);

  gl_FragColor = vec4(color,1.0);
}