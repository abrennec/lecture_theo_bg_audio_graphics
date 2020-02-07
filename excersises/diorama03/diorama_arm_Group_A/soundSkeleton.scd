

Ndef(\armSound).edit

Ndef(\armSound, {|amps = #[0, 0, 0, 0, 0, 0, 0, 0, 0]|
	var freqs, snd;

	amps = amps.lag(0.001);
	freqs = Scale.minor.degreeToFreq([2, 3, 4, 5, 6, 7, 8, 9, 10], 100, 1);
	snd = Splay.ar(SinOscFB.ar(freqs, 0.1) * amps);


	snd;
});



Ndef(\armSound).setn(\amps, {1.0.rand}!9)




OSCdef.trace(true)
OSCdef.trace(false)




[ "/arm", 2, 0.69450986385345, 0.50111716985703, -0.66720467805862 ][2..]


q = ();

q.parts = [[0, 0, 0],[0, 0, 0],[0, 0, 0]];


OSCdef(\arm, {|msg|
	q.parts[msg[1]] = msg[2..];
	Ndef(\armSound).setn(\amps, q.parts.flat)
}, "/arm")


SynthDef

