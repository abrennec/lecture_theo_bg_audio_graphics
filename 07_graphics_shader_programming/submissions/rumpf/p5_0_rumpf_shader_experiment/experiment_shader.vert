precision mediump float;

uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;
uniform float uFrameCount;

// Get the vertex normal attribute from the geometry
attribute vec3 aNormal;
attribute vec3 aPosition;       
attribute vec2 aTexCoord;

varying vec2 vTexCoord;
varying vec3 vNormal;
varying vec3 myPos;

void main() {
   
   // Frequency and Amplitude will determine the look of the displacement
   float frequency = 1.0;
   float amplitude = 20.0;


   vec4 vPos = vec4(aPosition,1.0);
   vPos.xyz = vPos.xyz * vec3(25.0) + vec3(0.0, 200.0, 0.0);

// Displace the x position withe the sine of the x + time. Multiply by the normal to move it in the correct direction
  // You could add more distortions to the other axes too. 
  float distortion = sin(vPos.x * frequency + uFrameCount * 0.1);
  vPos.x += distortion * aNormal.x * amplitude;


   gl_Position = uProjectionMatrix * uModelViewMatrix * vPos;

   // Send the texture coordinates to the fragment shader
   vTexCoord = aTexCoord;
   // Send the normal to the fragment shader
   vNormal = aNormal;

   myPos = vPos.xyz;
}

