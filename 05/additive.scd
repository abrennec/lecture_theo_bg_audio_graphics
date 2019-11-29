// additive synthesis with independant parameters
// possible to use for resynthesis based on Fourier transform

(
Ndef(\additive, {
	var freqs = [100, 300, 500, 1000, 1500];
	var udBs = [-5, -30, -35, -55, -55];
	var amps = udBs.dbamp;

	SinOsc.ar(
		freq: freqs,
		phase: 0,
		mul: amps
	).sum;
})
)



// harmonic additive synthesis

Ndef(\harmonics).edit

(
Ndef(\harmonics).addSpec(
	\amp1, [-1, 1],
	\amp2, [-1, 1],
	\amp3, [-1, 1],
	\amp4, [-1, 1],
	\amp5, [-1, 1],
	\amp6, [-1, 1],
	\amp7, [-1, 1],
	\phase1, [0, 2pi],
	\phase2, [0, 2pi],
	\phase3, [0, 2pi],
	\phase4, [0, 2pi],
	\phase5, [0, 2pi],
	\phase6, [0, 2pi],
	\phase7, [0, 2pi],
	\deharm, [0.9, 1.2]
);

Ndef(\harmonics, {|fundFreq = 100, amp = 1,
	amp1 = 1, amp2, amp3, amp4, amp5, amp6, amp7, deharm = 1,
	phase1 = 0, phase2 = 0, phase3 = 0, phase4 = 0, phase5 = 0, phase6 = 0, phase7 = 0
	|

	var freqs = [fundFreq] ++ (fundFreq * [2, 3, 4, 5, 6, 7] * deharm);
	var amps = [amp1, amp2, amp3, amp4, amp5, amp6, amp7];
	var phases = [phase1, phase2, phase3, phase4, phase5, phase6, phase7];

	Mix(SinOsc.ar(
		freq: freqs,
		phase: phases,
		mul: amps
	))!2 * amp;

})
)

// saw
Ndef(\harmonics).set(
	\amp1, 1/1,
	\amp2, 1/2,
	\amp3, 1/3,
	\amp4, 1/4,
	\amp5, 1/5,
	\amp6, 1/6,
	\amp7, 1/7
)

// pulse
Ndef(\harmonics).set(
	\amp1, 1/1,
	\amp2, 0,
	\amp3, 1/3,
	\amp4, 0,
	\amp5, 1/5,
	\amp6, 0,
	\amp7, 1/7
)

// impulse

Ndef(\harmonics).set(
	\amp1, 1,
	\amp2, 0.9,
	\amp3, 0.8,
	\amp4, 0.7,
	\amp5, 0.6,
	\amp6, 0.5,
	\amp7, 0.4
)




Ndef(\harmonics).edit









///////////////////////






