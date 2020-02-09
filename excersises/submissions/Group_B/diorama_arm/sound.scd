Ndef(\armSound).edit

Ndef(\armSound, {|amps = #[0, 0, 0, 0, 0, 0, 0, 0, 0],t_trig = 0|
	var freqs, snd, env;
	amps = amps.lag(0.001);
	freqs = Scale.minor.degreeToFreq([2, 3, 4, 5, 6, 7, 8, 9, 10], 100, 1);
	snd = Splay.ar(SinOscFB.ar(freqs, 0.1) * amps);
	env = EnvGen.ar(Env.perc(),t_trig);

	snd*env;
}).play;

OSCdef.trace(true)
OSCdef.trace(false)

OSCdef(\bewegung, {|msg|
	Ndef(\armSound).setn(\t_trig,1);
	Ndef(\armSound).setn(\amps, {1.0.rand}!9);
}, "/bewegung")


SynthDef
