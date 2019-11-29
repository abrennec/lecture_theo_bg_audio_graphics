s.boot;

// complex waveform 1
// amplitude
// wave — 0..4
//    tri
//    saw
//    pulse
//    impulse
//    noise
// harmonics
(
Ndef(\subtractive)
	.addSpec(\a_osc1, \amp)
	.addSpec(\a_osc2, \amp)
	.addSpec(\a_osc3, \amp)
	.addSpec(\w_osc1, [0, 4, \lin, 1, 0])
	.addSpec(\w_osc2, [0, 4, \lin, 1, 0])
	.addSpec(\w_osc3, [0, 4, \lin, 1, 0])
	.addSpec(\h_osc1, [0, 10, \lin, 1, 2])
	.addSpec(\h_osc2, [0, 10, \lin, 1, 2])
	.addSpec(\h_osc3, [0, 10, \lin, 1, 2]);
Ndef(\subtractive, {|
	fundFreq = 100,
	a_osc1, w_osc1, h_osc1,
	a_osc2, w_osc2, h_osc2,
	a_osc3, w_osc3, h_osc3
	|

	// components
	var snd, vco;

	// helpers
	var amps = [a_osc1, a_osc2, a_osc3];
	var waves = [w_osc1, w_osc2, w_osc3];
	var harms = [h_osc1, h_osc2, h_osc3];

	vco = Mix([amps, waves, harms].flop.collect{|params, i|
		var amp, wave, harm, freq, partial;
		#amp, wave, harm = params;

		freq = fundFreq * Select.kr(harm, #[0.25, 0.5, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
		partial = Select.ar(wave, [
			VarSaw.ar(freq, width: 0.5),
			Saw.ar(freq),
			Pulse.ar(freq),
			Impulse.ar(freq),
			WhiteNoise.ar
		]);
		partial * amp
	});

	snd = vco;

	//stereo
	snd!2

});
)
Ndef(\subtractive).edit

///////////////////////////////////////////////////////

(
Ndef(\subtractive)
	.addSpec(\a_osc1, \amp)
	.addSpec(\a_osc2, \amp)
	.addSpec(\a_osc3, \amp)
	.addSpec(\w_osc1, [0, 4, \lin, 1, 0])
	.addSpec(\w_osc2, [0, 4, \lin, 1, 0])
	.addSpec(\w_osc3, [0, 4, \lin, 1, 0])
	.addSpec(\h_osc1, [0, 10, \lin, 1, 2])
	.addSpec(\h_osc2, [0, 10, \lin, 1, 2])
	.addSpec(\h_osc3, [0, 10, \lin, 1, 2])
	.addSpec(\env_gate, [0, 1, \lin, 1])
	.addSpec(\env_attack, [0, 5, \lin])
	.addSpec(\env_decay, [0, 1, \lin])
	.addSpec(\env_sustain, [0, 1, \lin])
	.addSpec(\env_release, [0, 5, \lin])
;
Ndef(\subtractive, {|
	fundFreq = 100,
	a_osc1, w_osc1, h_osc1,
	a_osc2, w_osc2, h_osc2,
	a_osc3, w_osc3, h_osc3,
	env_gate, env_attack = 0.1, env_decay = 0.1, env_sustain = 0.9, env_release = 0.2
	|

	// components
	var snd, vca, vco;

	// helpers
	var amps = [a_osc1, a_osc2, a_osc3];
	var waves = [w_osc1, w_osc2, w_osc3];
	var harms = [h_osc1, h_osc2, h_osc3];

	vca = Mix([amps, waves, harms].flop.collect{|params, i|
		var amp, wave, harm, freq, partial;
		#amp, wave, harm = params;

		freq = fundFreq * Select.kr(harm, #[0.25, 0.5, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
		partial = Select.ar(wave, [
			VarSaw.ar(freq, width: 0.5),
			Saw.ar(freq),
			Pulse.ar(freq),
			Impulse.ar(freq),
			WhiteNoise.ar
		]);
		partial * amp
	});

	vco = EnvGen.ar(Env.adsr(env_attack, env_decay, env_sustain, env_release), env_gate);
	snd = vca * vco;

	// stereo
	snd!2

});
)
Ndef(\subtractive).edit


Ndef(\subtractive).set(\env_gate, 1)
Ndef(\subtractive).set(\env_gate, 0)


///////////////////////////

(
Ndef(\subtractive)
	.addSpec(\fundFreq, \freq)
	.addSpec(\a_osc1, \amp)
	.addSpec(\a_osc2, \amp)
	.addSpec(\a_osc3, \amp)
	.addSpec(\w_osc1, [0, 4, \lin, 1, 0])
	.addSpec(\w_osc2, [0, 4, \lin, 1, 0])
	.addSpec(\w_osc3, [0, 4, \lin, 1, 0])
	.addSpec(\h_osc1, [0, 10, \lin, 1, 2])
	.addSpec(\h_osc2, [0, 10, \lin, 1, 2])
	.addSpec(\h_osc3, [0, 10, \lin, 1, 2])
	.addSpec(\env_gate, [0, 1, \lin, 1])
	.addSpec(\env_attack, [0, 5, \lin])
	.addSpec(\env_decay, [0, 1, \lin])
	.addSpec(\env_sustain, [0, 1, \lin])
	.addSpec(\env_release, [0, 5, \lin])
	.addSpec(\filt_type, [0, 2, \lin, 1, 0])
	.addSpec(\filt_freq, [30, 5000, \exp, 0, 400])
	.addSpec(\filt_emph, [0.5, 10, \exp])
;
Ndef(\subtractive, {|
	fundFreq = 100,
	a_osc1, w_osc1, h_osc1,
	a_osc2, w_osc2, h_osc2,
	a_osc3, w_osc3, h_osc3,
	env_gate, env_attack = 0.1, env_decay = 0.1, env_sustain = 0.9, env_release = 0.2,
	filt_type, filt_freq = 400, filt_emph = 0.5
	|

	// components
	var snd, vca, vco, vcf;

	// helpers
	var amps = [a_osc1, a_osc2, a_osc3];
	var waves = [w_osc1, w_osc2, w_osc3];
	var harms = [h_osc1, h_osc2, h_osc3];

	vca = Mix([amps, waves, harms].flop.collect{|params, i|
		var amp, wave, harm, freq, partial;
		#amp, wave, harm = params;

		freq = fundFreq * Select.kr(harm, #[0.25, 0.5, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
		partial = Select.ar(wave, [
			VarSaw.ar(freq, width: 0.5),
			Saw.ar(freq),
			Pulse.ar(freq),
			Impulse.ar(freq),
			WhiteNoise.ar
		]);
		partial * amp
	});

	vco = EnvGen.ar(Env.adsr(env_attack, env_decay, env_sustain, env_release), env_gate);
	snd = vca * vco;

	// prevent jumps
	filt_freq = VarLag.kr(filt_freq, 0.1, start: filt_freq);
	filt_emph = VarLag.kr(filt_emph, 0.1, start: filt_emph);

	vcf = Select.ar(filt_type, [
		RLPF.ar(snd, filt_freq, 1/filt_emph),
		RHPF.ar(snd, filt_freq, 1/filt_emph),
		BPF.ar(snd, filt_freq, 1/filt_emph)
	]);

	snd = vcf;

	// stereo
	snd!2

});
)

Ndef(\subtractive).edit


Ndef(\subtractive).set(\env_gate, 1)
Ndef(\subtractive).set(\env_gate, 0)


