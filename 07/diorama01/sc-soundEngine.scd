s.boot;

(
SynthDef(\sound, {|freq = 400, amp = 0.1, gate = 1|
	var snd = SinOscFB.ar(freq) * amp!2;
	snd = snd * EnvGen.kr(Env.asr(), gate: gate);
	Out.ar(0, snd);
}).add;
)

q = ();

// the interface
q.theSynth = Synth(\sound);
q.theSynth.set(\freq, 200)
q.theSynth.set(\freq, 500, \amp, 0.2)
q.theSynth.release

// mapping
q.mapper = {|q, x, y|
	var freq, amp;

	freq = x.linexp(0, 1, 400, 1600);
	amp = y.linlin(0, 1, 0, 1);

	[\freq, freq, \amp, amp].postln
};


// the osc interface
(
OSCdef(\start, {|msg|
	msg.postln;
	q.theSynth = Synth(\sound, q.mapper(msg[1], msg[2]))
}, "/start");

OSCdef(\set, {|msg|
	msg.postln;
	q.theSynth.set(*q.mapper(msg[1], msg[2]))
}, "/set");

OSCdef(\stopped, {|msg|
	msg.postln;
	q.theSynth.release
}, "/stopped");
)