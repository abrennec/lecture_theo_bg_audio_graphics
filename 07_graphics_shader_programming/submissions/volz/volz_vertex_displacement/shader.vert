precision mediump float;

// Get the position attribute of the geometry
attribute vec3 aPosition;

// Get the texture coordinate attribute from the geometry
attribute vec2 aTexCoord;

// Get the vertex normal attribute from the geometry
attribute vec3 aNormal;

// uProjectionMatrix is used to convert the 3d world coordinates into screen coordinates 
uniform mat4 uProjectionMatrix;
uniform mat4 uModelViewMatrix;

// Get the framecount uniform
uniform float uFrameCount;

varying vec2 vTexCoord;
varying vec3 vNormal;

void main() {

  // copy the position data into a vec4, using 1.0 as the w component
  vec4 positionVec4 = vec4(aPosition, 1.0);

  // Frequency and Amplitude will determine the look of the displacement
  float frequencyX = 26.5;
  //float amplitudeX = 30.0;
  float amplitudeX = 0.3 * (sin(uFrameCount * 0.0013 + 3.14) + 1.0);
  
  float frequencyY = 111.31;
  float amplitudeY = 0.3 * (sin(uFrameCount * 0.027 + 3.14) + 1.0);
  
  float frequencyZ = 23.27;
  float amplitudeZ = 0.3 * (sin(uFrameCount * 0.053 + 3.14) + 1.0);

  // Displace the x position withe the sine of the x + time. Multiply by the normal to move it in the correct direction
  // You could add more distortions to the other axes too. 
  float distortionX = sin(positionVec4.x * frequencyX + uFrameCount * 0.1);
  positionVec4.x += distortionX * aNormal.x * amplitudeX;
  
  float distortionY = sin(positionVec4.y * frequencyY + uFrameCount * 0.1);
  
  positionVec4.y += distortionY * aNormal.y * amplitudeY;
  
  float distortionZ = sin(positionVec4.z * frequencyZ + uFrameCount * 0.1);
  
  positionVec4.z += distortionZ * aNormal.z * amplitudeZ;
    

  // Send the normal to the fragment shader
  vNormal = aNormal;

  gl_Position = uProjectionMatrix * uModelViewMatrix * positionVec4;

  // Send the texture coordinates to the fragment shader
  vTexCoord = aTexCoord;
}