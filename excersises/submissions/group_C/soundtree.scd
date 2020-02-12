s.boot;

// frequency modulation

SynthDef(\sound, {
	|freq=200, atk=0.01, decay=0.3, sustain=0.4, rel=0.1
	carratio=1,modratio=1, modindex=1,
	amp=0.2, gate=1, outBus=0|
	var env = EnvGen.kr(Env.adsr(atk, decay, sustain, rel), gate, doneAction:2);
	var mod = SinOsc.ar(freq * modratio);
	var car = SinOsc.ar(freq * carratio + (1 + (mod *modindex)), 0) * amp * env;

	Out.ar(0, car ! 2);
}).add;

q = ();

// plays sound when the mouse is pressed

OSCdef(\start, {|msg|
	msg.postln;
	q.theSynth = Synth(\sound);
    q.theSynth.set(\freq, 150);
	q.theSynth.set(\amp, 0.5);
}, "/start");


Server.quitAll


