precision mediump float;

// -----------------------------------
//  Visuals are based on the Ferrofluid Shader by Will Kirkby 
//	Find the original Shader here: https://www.shadertoy.com/view/ltcyDf
// -----------------------------------

uniform vec3 iResolution;           	
uniform float iTime;             
uniform sampler2D iChannel0;

uniform float sphereRadius;
uniform float sphereYoffset;
uniform float sphereSpikeCount;
uniform float spikeyness;
uniform float metaballRadius;
uniform float floorOffset;
uniform float zoom;
uniform float camOffsetX;
uniform float camOffsetY;
uniform float invert;
uniform float wanderRange;
uniform float MetaYOffset;

const float fftInfluence = 8.0;


//// Found in "After Effects: Tint" on Shadertoy: https://www.shadertoy.com/view/7syXz3
const vec3 luminanceWeighting = vec3(0.2125, 0.7154, 0.0721);
vec3 tintAdjust(vec3 color, vec3 mapBlackTo, vec3 mapWhiteTo, float amount) {
    float luminance = dot(color, luminanceWeighting);
    return mix(color, mix(mapBlackTo, mapWhiteTo, luminance), amount);
}
////

// Setup Spikey Sphere
float funnysphere(vec3 p)
{
	//x = nr of Bands = 512
	vec2 resolutionOfTexture = vec2(512., 1.);
	int pixelX = 0;
	int pixelY = 0;
	vec2 uvFFT = (vec2(pixelX, pixelY) + .5) / resolutionOfTexture;

	// read frequency data from first row of texture
    float fft = spikeyness - (texture2D( iChannel0, uvFFT ).x);

	p.y += -sphereYoffset;
    vec3 n = normalize(p);
    vec2 sg = p.xz / (0.5 + n.y);
	// make Spikes audio reactive and get SpikeCount from Keyframe/Slider
    float offset = length(fract(sg*sphereSpikeCount+iTime*0.9)-0.5)* 0.2 *fft + 0.2*fft;
    return length(p+vec3(0,.0,0))-sphereRadius + offset;
}

float _smin( float a, float b, float k )
{
    float res = exp( -k*a ) + exp( -k*b );
    return -log( res )/k;
}
float smin( float a, float b)
{
    return _smin(a,b,25.);
}

float metaballs(vec3 p)
{
	// Get FFT Texture Values
	vec2 resolutionOfTexture = vec2(512., 1.); //x = nr of Bands = 512
	int pixelX = 0;
	int pixelY = 0;
	vec2 uv = (vec2(pixelX, pixelY) + .5) / resolutionOfTexture;


	// Setup metaballs and assign individual FFT Bands to scaling
    p -= vec3(0,.65,0);
	float fftbands0 = texture2D( iChannel0, (vec2(pixelX +5, pixelY) + .5) / resolutionOfTexture ).x * fftInfluence;
    vec3 p0 = p + vec3(0.0, MetaYOffset, 0.0) + sin(vec3(0.0, 1.0, 1.37)*iTime*0.1)*wanderRange;
	float fftbands1 = texture2D( iChannel0, (vec2(pixelX +10, pixelY) + .5) / resolutionOfTexture ).x * fftInfluence;
    vec3 p1 = p + vec3(0.0, MetaYOffset, 0.0) + sin(vec3(1.0, 3.2, 3.57)*iTime*0.1)*wanderRange;
	float fftbands2 = texture2D( iChannel0, (vec2(pixelX+ 15, pixelY) + .5) / resolutionOfTexture ).x * fftInfluence;
    vec3 p2 = p + vec3(0.0, MetaYOffset, 0.0) + sin(vec3(4.4, 1.4, 0.97)*iTime*0.1)*wanderRange;
	float fftbands3 = texture2D( iChannel0, (vec2(pixelX +20, pixelY) + .5) / resolutionOfTexture ).x * fftInfluence;
	vec3 p3 = p + vec3(0.0, MetaYOffset, 0.0) + sin(vec3(1.6, 2.6, 1.3)*iTime*0.1)*wanderRange;
	float fftbands4 = texture2D( iChannel0, (vec2(pixelX+25, pixelY) + .5) / resolutionOfTexture ).x * fftInfluence;
	vec3 p4 = p + vec3(0.0, MetaYOffset, 0.0) + sin(vec3(2.8, 1.8, 2.3)*iTime*0.1)*wanderRange;
	float fftbands5 = texture2D( iChannel0, (vec2(pixelX +30, pixelY) + .5) / resolutionOfTexture ).x * fftInfluence;
	vec3 p5 = p + vec3(0.0, MetaYOffset, 0.0) + sin(vec3(1.5, 2.0, 2.83)*iTime*0.1)*wanderRange;
	float fftbands6 = texture2D( iChannel0, (vec2(pixelX +40, pixelY) + .5) / resolutionOfTexture ).x * fftInfluence;
	vec3 p6 = p + vec3(0.0, MetaYOffset, 0.0) + sin(vec3(2.2, 2.2, 1.83)*iTime*0.1)*wanderRange;
	float fftbands7 = texture2D( iChannel0, (vec2(pixelX +50, pixelY) + .5) / resolutionOfTexture).x * fftInfluence;
	vec3 p7 = p + vec3(0.0, MetaYOffset, 0.0) + sin(vec3(3.4, 2.4, 0.57)*iTime*0.1)*wanderRange;
	float fftbands8 = texture2D( iChannel0, (vec2(pixelX +60, pixelY) + .5) / resolutionOfTexture ).x * fftInfluence;
	vec3 p8 = p + vec3(0.0, MetaYOffset, 0.0) + sin(vec3(2.6, 1.4, 2.3)*iTime*0.1)*wanderRange;
	float fftbands9 = texture2D( iChannel0, (vec2(pixelX +80, pixelY) + .5) / resolutionOfTexture ).x * fftInfluence;
	vec3 p9 = p + vec3(0.0, MetaYOffset, 0.0) + sin(vec3(2.8, 1.8, 1.3)*iTime*0.1)*wanderRange;
	float fftbands10 = texture2D( iChannel0, (vec2(pixelX +100, pixelY) + .5) / resolutionOfTexture ).x * fftInfluence;
	vec3 p10 = p + vec3(0.0, MetaYOffset, 0.0) + sin(vec3(3.0, 1.0, 3.3)*iTime*0.1)*wanderRange;
	float fftbands11 = texture2D( iChannel0, (vec2(pixelX +120, pixelY) + .5) / resolutionOfTexture ).x * fftInfluence;
	vec3 p11 = p + vec3(0.0, MetaYOffset, 0.0) + sin(vec3(1.2, 2.2, 2.0)*iTime*0.1)*wanderRange;

	// calculate joined SDF
    return smin(
				smin( 
					smin(
						smin(smin(smin(smin(smin(smin(smin(smin(
						length(p0)-metaballRadius * fftbands0,
						length(p1)-metaballRadius * fftbands1
						),
					length(p2)-metaballRadius  * fftbands2
					), 
					length(p3) - metaballRadius  * fftbands3
				), length(p4) -metaballRadius * fftbands4), length(p5) -metaballRadius* fftbands5), length(p6) -metaballRadius* fftbands6), length(p7) -metaballRadius* fftbands7), length(p8) -metaballRadius* fftbands8), length(p9) -metaballRadius* fftbands9), length(p10) -metaballRadius* fftbands10), length(p11) -metaballRadius* fftbands11
    );
}

// join Scene
float scene(vec3 p)
{
	return smin(
	    smin(
			p.y + floorOffset,
			funnysphere(p)
    	),
    	metaballs(p)
  	);
}

// used for camera rotation
vec2 rotate(vec2 a, float b)
{
  	float c = cos(b);
  	float s = sin(b);
  	return vec2(
	    a.x * c - a.y * s,
	    a.x * s + a.y * c
  	);
}

void main()
{


	vec2 uv = (gl_FragCoord.xy / iResolution.xy) - .5;
  	uv.x *= iResolution.x / iResolution.y;

	// camera setup and operations
	vec3 cam = vec3(0,0,-5);
	vec3 dir = normalize(vec3(uv, zoom));
	cam.xz = cam.xz + vec2(camOffsetX,camOffsetY);
	cam.xz = rotate(cam.xz, iTime*0.2);
	dir.xz = rotate(dir.xz, iTime*.2);
	cam.y = 0.45;

	// accuracy samples?
	float t = 0.;
	for (int i = 0; i< 100; ++i)
	{
		float k = scene(cam + dir * t);
		t += k * .33;
		if(k < .001)
			break;
	}

	vec3 h = cam + dir * t;
	vec2 o = vec2(0.01, 0);
	vec3 n = normalize(vec3(
		scene(h+o.xyy)-scene(h-o.xyy),
		scene(h+o.yxy)-scene(h-o.yxy),
		scene(h+o.yyx)-scene(h-o.yyx)
	));

	float fresnel = (pow(1.0 -max(0.,dot(n,-dir)),5.)*0.98+0.01);
	gl_FragColor = vec4(fresnel , fresnel , fresnel, 1.0);


	//// Found in "After Effects: Tint" on Shadertoy: https://www.shadertoy.com/view/7syXz3
	vec4 mapBlackTo = vec4(1, 1, 1, 1);
	vec4 mapWhiteTo = vec4(0, 0, 0, 1);
	gl_FragColor.xyz = tintAdjust(gl_FragColor.xyz, mapBlackTo.rgb, mapWhiteTo.rgb, invert);


	//// Found in "Film grain " on Shadertoy: https://www.shadertoy.com/view/4sXSWs
	float x = (uv.x + 4.0 ) * (uv.y + 4.0 ) * (iTime * 10.0);
	float strength = 16.0;
	vec4 grain = vec4(mod((mod(x, 13.0) + 1.0) * (mod(x, 123.0) + 1.0), 0.01)-0.005) * strength;
	grain = 1.0 - grain;
	gl_FragColor = gl_FragColor * grain;
	// vignette
	gl_FragColor.xyz =  gl_FragColor.xyz * smoothstep(0.9, 0.1, abs(uv.x * 0.5));
	gl_FragColor.xyz =gl_FragColor.xyz * smoothstep(0.4, 0.2, abs(uv.y));
    
}