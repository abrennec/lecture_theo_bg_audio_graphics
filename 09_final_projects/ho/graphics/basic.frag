precision mediump float;
precision mediump int;

uniform vec4 uMaterialColor;
varying vec2 vTexCoord;
// Get the normal from the vertex shader
varying vec3 vVertexNormal;
varying vec3 vNormal;
varying vec3 vPosition;



#define PROCESSING_LINE_SHADER

varying vec4 vertColor;

uniform float fogNear;
uniform float fogFar;

void main(){
    gl_FragColor = uMaterialColor * vec4(vPosition, 1.0);
   
    vec3 fogColor = vec3(1.0, 0.0, 0.0);
    float depth = gl_FragCoord.z / gl_FragCoord.w;
    float fogFactor = smoothstep(fogNear, fogFar, depth);
    gl_FragColor = mix(gl_FragColor, vec4(fogColor, gl_FragColor.w), fogFactor/2.0);
}


//alt void main() function:

// vec3 getRGB(float h, float s, float b){
//     vec3 c = vec3(h, s, b);
//     vec3 rgb = clamp(abs(mod(c.x * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
//     rgb = rgb * rgb * (3.0 - 2.0 * rgb);
//     return c.z * mix(vec3(1.0), rgb, c.y);
// }

// void main() {

//   // Normalize the normal
//   vec3 color = (vPosition * 0.5 + 0.5);

//   gl_FragColor = uMaterialColor * vec4(vPosition, 1.0); //vec4(color, 1.0); // * vec4(0.0, 0.0, 1.0, 1.0)


//   // vec3 p = vPosition;
//   // vec3 col = getRGB(0.55, abs(p.x), 1.0);
//   // gl_FragColor = vec4(col, 1.0);
// }