// How can two sine waves be used to create timbre?

// 1. (+) addition
// 2. (*) multiplication — ring modulation
// 3. (sin(sin)) function composition

// additive synthesis
// create timbre by superimposing (adding) multiple sine waves
(
Ndef(\sines).addSpec(
	\freq1, \freq,
	\freq2, \freq,
	\amp1, \amp,
	\amp2, \amp
);
Ndef(\sines, {|freq1 = 400, freq2 = 400, amp1, amp2|
	var sine1, sine2, snd;

	sine1 = SinOsc.ar(
		freq: freq1,
		mul: amp1
	);
	sine2 = SinOsc.ar(
		freq: freq2,
		mul: amp2
	);

	// additive synthesis
	sine1 + sine2
})
)

Ndef(\sines).edit;


/////////// ring modulation ///////////////

(
Ndef(\sines).addSpec(
	\freq1, \freq,
	\freq2, [0, 10],
	\amp1, \amp,
	\amp2, \amp
);
)

(
Ndef(\sines, {|freq1 = 400, freq2 = 400, amp1, amp2|
	var sine1, sine2, snd;

	sine1 = SinOsc.ar(
		freq: freq1,
		mul: amp1
	);
	sine2 = SinOsc.ar(
		freq: freq2,
		mul: amp2
	);

	// ring modulation
	sine1 * sine2
})
)


/////////// "division" modulation ///////////////

(
Ndef(\sines, {|freq1 = 400, freq2 = 400, amp1, amp2|
	var sine1, sine2, snd;

	sine1 = SinOsc.ar(
		freq: freq1,
		mul: amp1
	);
	sine2 = SinOsc.ar(
		freq: freq2,
		mul: amp2
	);

	// division modulation
	// signal gets very loud at (sine2 == 0)
	tanh(sine1 / sine2)
})
)


//////////// FM synthesis //////////////////////////

(
Ndef(\sines, {|freq1 = 400, freq2 = 400, amp1, amp2|
	var sine1, sine2, snd;

	sine1 = SinOsc.ar(
		freq: freq1,
		mul: amp1
	);
	sine2 = SinOsc.ar(
		freq: freq2 * sine1.linlin(-1, 1, 0.5, 1),
		mul: amp2
	);

	sine2
})
)



(
Ndef(\sines, {|carFreq = 400, modFreq = 400, carAmp, modAmp|
	var carrier, modulator;

	modulator = SinOsc.ar(
		freq: modFreq,
		mul: modAmp
	);
	carrier = SinOsc.ar(
		freq: carFreq + modulator,
		mul: carAmp
	);

	carrier
})
)


////////////////////// PM Synthesis

(
Ndef(\sines, {|freq1 = 400, freq2 = 400, amp1, amp2|
	var sine1, sine2, snd;

	sine1 = SinOsc.ar(
		freq: freq1,
		mul: amp1
	);
	sine2 = SinOsc.ar(
		freq: freq2,
		mul: amp2,
		phase:  sine1.linlin(-1, 1, -pi, pi)
	);

	sine2
})
)

Ndef(\sines).edit