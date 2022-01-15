#extension GL_OES_standard_derivatives : enable
precision mediump float;

varying vec3 vNormal;
varying vec3 myPos;

//float dFdx(float x);
//float dFdy(float y);


uniform vec2 mouse;


vec4 lerp(vec4 colorone, vec4 colortwo, float value)
{
	return (colorone + value*(colortwo-colorone));
}

void main() {


////////////////////////////////////////////////////
// this part is manly transferred over from https://vvvv.org/contribution/elevation
// had to add a lerp function and enable GL_OES_standard_derivatives
/////////

  float Scale = mouse.y;
  float Width = mouse.x;
  float Balance = 0.5;

	float op = Width/Scale;
	float edge = Scale*Balance;
	
	float width;
	float w;
	float x0;
	float x1;
	float nedge;
	float i0;
	float i1;
	float check = 0.0;
	float s;


 // Normalize the normal
  vec4 Normalcolor = vec4(vNormal * 0.5 + 0.5, 1.0);
  
  // Lets just draw the texcoords to the screen
  

	  width = abs(dFdx(myPos.y)) + abs(dFdy(myPos.y));
		w = width*op;
		x0 = myPos.y/Scale - (w/2.0);
		x1 = x0 + w;
		nedge = edge/Scale;
		i0 = (1.0-nedge)*floor(x0) + max(0.0, fract(x0)-nedge);
		i1 = (1.0-nedge)*floor(x1) + max(0.0, fract(x1)-nedge);
		check = (i1 - i0)/w;
		check = min(1.0,max(0.0,check));

vec4 SurfColor1 = vec4(1.0,0.0,0.5,1.0);
//vec4 SurfColor2 = vec4(0.0,1.0,0.0,1.0);
vec4 SurfColor2 = Normalcolor;
vec4 dColor = lerp(SurfColor1,SurfColor2,check);

/////////////////////////////////////////////////////////////

gl_FragColor = dColor;
}
