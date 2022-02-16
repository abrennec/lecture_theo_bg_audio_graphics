#define PROCESSING_LINE_SHADER

uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;
uniform float uStrokeWeight;

uniform vec4 uViewport;
uniform int uPerspective;

uniform float uCount;
const float TAU = 6.28318;
const float PI = 3.14159;

attribute vec4 aPosition;
attribute vec4 aDirection;

varying vec3 vPosition;
varying vec3 vNormal;
varying vec3 vVertexNormal;
varying vec4 vertColor;

float func0(float x){ return x * x; }
float func1(float x){ return 0.5 * (1.0 - cos(PI * x)); }
float func2(float x){ return x * x * (3.0 - 2.0 * x); }
float func3(float x){ return 0.5 + 0.5 * sin(PI * x) * cos(PI * x + PI * 0.4); }
float func4(float x){ return 0.5 * sin(2.0 * x) + 0.25 * sin(4.0 * x) + 0.125 * sin(8.0 * x); }
float func5(float theta, float a, float b, float m, float n1, float n2, float n3){ return pow(((pow(abs((cos((m * theta) / 4.0)) / a), n2)) + (pow(abs(sin((m * theta) / 4.0) / b), n3))), (-1.0 / n1)); }

void main() {
  vPosition = aPosition.xyz;
  
  vec3 aPos = aPosition.xyz;

  //here I tried to integrate the superfunction in the vertex shader, but wasn't able to get to it in time:
  //aPos.x = aPos.x * func5(200.0, 1.0, 1.0, 0.0, 1.0, 1.0, 1.0);
  //float lat = func5()

  // aPos.x = cos(theta) * lat * cos(gamma) * long * sfactor;
	// aPos.y = sin(theta) * lat * cos(gamma) * long * sfactor;
	// aPos.z = sin(gamma) * long * sfactor;

  vec4 modifiedPos = vec4(aPos, 1.0);

  vec4 posp = uModelViewMatrix * modifiedPos;

  float dir = atan(-func4(aPos.x + 1.0 / 300.0) * sin(uCount * TAU / 240.0) + func4(aPos.x) * sin(uCount * TAU / 240.0), 1.0 / 300.0);
  vec4 posq = uModelViewMatrix * (modifiedPos + vec4(vec3(cos(dir), sin(dir), 0.0), 0));

  vec4 p = uProjectionMatrix * posp;
  vec4 q = uProjectionMatrix * posq;

  vec2 tangent = normalize((q.xy*p.w - p.xy*q.w) * uViewport.zw);

  // flip tangent to normal (it's already normalized)
  vec2 normal = vec2(-tangent.y, tangent.x);

  // controls the thickness of the line
  float factor = 3.0;
  float thickness = aDirection.w * uStrokeWeight * factor;
  vec2 offset = normal * thickness / 2.0;

  gl_Position.xy = p.xy + offset.xy;
  gl_Position.zw = p.zw;
}