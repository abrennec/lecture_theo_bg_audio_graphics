s.boot;

( // << select the whole bracket and evaluate

//Some superficial bits have been changed and added to original

// CloudGenMini is based on CloudGenerator, a granular synthesis program
// by Curtis Roads and John Alexander.
// This partial miniature version was implemented by Alberto de Campo, 2007.




	// figure 8.23 - some granular synthdefs and tests
(
	// a gabor (approx. gaussian-shaped) grain
SynthDef(\pmGab, { |out, amp=0.1, carr=440, mod=880, index=0, sustain=0.01, pan|
	var snd = PMOsc.ar(carr, mod, index);
	var env = EnvGen.ar(Env.sine(sustain, amp * 0.5), doneAction: 2);
	OffsetOut.ar(out, Pan2.ar(snd * env, pan));
}, \ir ! 5).add;

			// wider, quasi-gaussian envelope, with a hold time in the middle.
SynthDef(\pmWide, { |out, amp=0.1, carr=440, mod=880, index=0, sustain=0.01, pan, width=0.5|
	var holdT = sustain * width;
	var fadeT = 1 - width * sustain * 0.5;
	var snd = PMOsc.ar(carr, mod, index);
	var env = EnvGen.ar(Env([0, 1, 1, 0], [fadeT, holdT, fadeT], \sin),
		levelScale: amp * 0.5,
		doneAction: 2);
	OffsetOut.ar(out, Pan2.ar(snd * env, pan));
}, \ir ! 5).add;

			// a simple percussive envelope
SynthDef(\pmPerc, { |out, amp=0.1, carr=440, mod=880, index=0, sustain=0.01, pan|
	var snd = PMOsc.ar(carr, mod, index);
	var env = EnvGen.ar(
		Env.perc(0.1, 0.9, amp * 0.5),
			timeScale: sustain, doneAction: 2
		);
	OffsetOut.ar(out, Pan2.ar(snd * env, pan));
}, \ir ! 5).add;

			// a reversed  percussive envelope
SynthDef(\pmPercRev, { |out, amp=0.1, carr=440, mod=880, index=0, sustain=0.01, pan|
	var snd = PMOsc.ar(carr, mod, index);
	var env = EnvGen.ar(
		Env.perc(0.9, 0.1, amp * 0.5, 4),
			timeScale: sustain, doneAction: 2
		);
	OffsetOut.ar(out, Pan2.ar(snd * env, pan));
}, \ir ! 5).add;



/*
	// tests for the synthdefs:
Synth(\gab1st);
Synth(\gabWide);
Synth(\percSin);
Synth(\percSinRev);

Synth(\percSin, [\amp, 0.2, \sustain, 0.1]);
Synth(\percNoise, [\amp, 0.2, \sustain, 0.1]);

Synth(\pmGab, [\out, 0, \amp, 0.2, \freq, 2000, \sustain, 0.05, \pan, 0.5] );
*/
);





	// figure 8.24 - global setup and a player Tdef for the cloud.
(
q = q ? ();

	// some globals
q.paramRNames = [\carrRange, \modRange, \indRange, \durRange, \densRange, \ampRange, \panRange];
q.paramNames = [\carr, \mod, \index, \grDur, \dens, \amp, \pan];
q.syndefNames = [\pmGab, \pmWide, \pmPerc, \pmPercRev];

	// specs for some parameters
Spec.add(\xfadeTime, [0.001, 1000, \exp]);
Spec.add(\ring, [0.03, 30, \exp]);
Spec.add(\grDur, [0.0001, 1, \exp]);
Spec.add(\dens, [1, 1000, \exp]);
Spec.add(\index, [0, 20, \lin, 0.001]);
Spec.add(\carr, \freq);
Spec.add(\mod, \freq);

	// make an empty tdef that plays it,
	// and put the cloud parameter ranges in the tdef's environment
Tdef(\cloud0)
	.set(
	\synName, \pmGab,
	\vol, 0.7,
	\current, (
		carrRange: [200, 2000],
		modRange: [400, 4000],
		indRange: [5, 12],
		ampRange: [0.5, 1],
		durRange: [0.001, 0.01],
		densRange: [10, 1000],
		panRange: [-1.0, 1.0]
	)
);

		// make the tdef that plays the cloud of sound particles here,
		// based on parameter range settings.
Tdef(\cloud0, { |e|

	loop {
		s.sendBundle(s.latency, [
			"/s_new", e.synName ? \pmGab,
			-1, 0, 0,
			\carr, 	exprand(e.current.carrRange[0], e.current.carrRange[1]),
			\mod, 	exprand(e.current.modRange[0], e.current.modRange[1]),
			\index,   rrand(e.current.indRange[0], e.current.indRange[1]),
			\amp,	exprand(e.current.ampRange[0], e.current.ampRange[1]) * e.vol,
			\sustain,	exprand(e.current.durRange[0], e.current.durRange[1]),
			\pan, 	rrand(e.current.panRange[0], e.current.panRange[1])
		]);
		exprand(e.current.densRange[0].reciprocal, e.current.densRange[1].reciprocal).wait;
	}
}).quant_(0);
);




/*
	// figure  8.25	-  tests for the cloud

Tdef(\cloud0).play;

	// try changing various things from outside the loop.
	// change its playing settings

Tdef(\cloud0).envir.current.put('densRange', [ 50, 200 ]); // dense, async
Tdef(\cloud0).envir.current.put('densRange', [ 1, 10 ]);  // sparse, async
Tdef(\cloud0).envir.current.put('densRange', [ 30, 30 ]); // synchronous

	// for faster access, call the tdef's envir d
d = Tdef(\cloud0).envir;
d.current.put('freqRange', [ 800, 1200 ]);
d.current.put('durRange', [ 0.02, 0.02 ]);

d.current.put('ampRange', [ 0.1, 0.1 ]);

d.current.put('panRange', [ 1.0, 1.0 ]);
d.current.put('panRange', [ -1.0, 1.0 ]);

d.current.put('densRange', [ 30, 60 ]);
d.synName = \percSin;
d.synName = \gab1st;
d.synName = \gabWide;
d.synName = \percSinRev;
d.synName = \percNoise;
d.synName = \percSinRev;
d.synName = \gab1st;
d.current.put('durRange', [ 0.001, 0.08 ]);


*/




	// figure 8.26 - making random settings, and 8 random presets to switch between
(
	// make the Tdef's envir a global variable for easier experimenting
d = Tdef(\cloud0).envir;
	// a pseudo-method to make random settings, kept in the Tdef's environment
		// randomize could also do limited variation on existing setting.
d.randSet = { |d|
	var randSet = ();
	q.paramRNames.do { |pName, i|
		randSet.put(pName,
			q.paramNames[i].asSpec.map([1.0.rand, 1.0.rand].sort)
		);
	};
	randSet;
};

/* 	test randSet:
d.current = d.randSet;
*/

// make 8 sets of parameter range settings:
d.setNames = (1..8).collect { |i| ("set" ++ i).asSymbol };
d.setNames.do { |key| d[key] = d.randSet; }

/*	test switching to the random presets
d.current = d.set1.copy;	// copy to avoid writing into a stored setting when it is current.
d.current = d.set3.copy;
d.current = d.set8.copy;
*/
);




	// ex. 8.27 - crossfading between different settings with a taskproxy

(
	// and some parameters for controlling the fade
d.stopAfterFade = false;
d.xfadeTime = 3;

d.morphtask = TaskProxy({
	var startSet = d[\current], endSet = d[\target];
	var stepsPerSec = 20;
	var numSteps = d.xfadeTime * stepsPerSec;
	var blendVal, morphSettings;

	if (d.target.notNil) {
		(numSteps).do { |i|
		//	["numSteps", i].postln;
			blendVal = (i + 1) / numSteps;
			morphSettings = endSet.collect({ |val, key|
				(startSet[key] ? val).blend(val, blendVal)
			});
			d.current_(morphSettings);
			(1/stepsPerSec).wait;
		};
		d.current_(d.target.copy);
		"morph done.".postln;
		if (d.stopAfterFade) { Tdef(\cloud0).stop; };
	};
}).quant_(0);		// no quantization so the task starts immediately

/* test morphing
(
Tdef(\cloud0).play;
d.target = d.set6.copy;
d.morphtask.play;
)
Tdef(\cloud0).stop;

	// playing a a finite cloud with tendency mask:
(
Tdef(\cloud0).play;		// begin playing
d.stopAfterFade = true; 	// end cloud when crossfade ends
d.xfadeTime = 10; 			// set fade time
d.target = d.set8.copy;		// and target
d.morphtask.play;			// and start crossfade.
)
*/

	// put fading into its own method, with optional stop.
d.fadeTo = { |d, start, end, time, autoStop|
	d.current = d[start] ? d.current;
	d.target = d[end];
	d.xfadeTime = time ? d.xfadeTime;
	if (autoStop.notNil) { d.stopAfterFade = autoStop };
	d.morphtask.stop.play;
};

/* 	// tests fadeTo:
Tdef(\cloud0).play;
d.fadeTo(\current, \set2, 20);
d.fadeTo(\current, \set6, 10);
d.fadeTo(\current, \set5, 3, true);

Tdef(\cloud0).play;
d.fadeTo(\current, \set1, 3, false);
*/
);



	// figure 8.28 is an image, the CloudGenMini GUI //




	// figure 8.29 - a lightweight graphical user interface for CloudGenMini
(
q.makeCloudGui = { |q, tdef, posPoint|
	var w, ezRangers, fdBox;
	var setMinis, skipjack;

	posPoint = posPoint ? 400@400;	// where to put the gui window

	w = Window.new("CloudGenMiniFM",
		Rect.fromPoints(posPoint, (posPoint + (400@360)))).front;
	w.view.decorator_(FlowLayout(w.bounds.copy.moveTo(0, 0)));

	w.view.decorator.nextLine;

		// a just in time - gui for the Tdef
	z = TdefGui(tdef, parent: w);

	fdBox = EZNumber.new(w, 78@18, \Fade, ControlSpec(0.01, 100.0, \exp, 0.01, 3, nil),
		{ |nbx| tdef.envir.xfadeTime = nbx.value },
		 tdef.envir.xfadeTime, false, 35);

	~recordButton = Button(w, 51@19);
    ~recordButton.states_([["rec", Color.black, Color.white],["rec", Color.white, Color.red]]);
    ~recordButton.action = {|view|
	                        if (view.value==1) {s.record} {s.stopRecording}};
    ~recordButton.value=0;

	w.view.decorator.nextLine;


		// the range sliders display the current values
	ezRangers = ();

	q.paramRNames.do { |name, i|
		ezRangers.put(name,
		EZRanger(w, 400@20, name, q.paramNames[i],
			{ |sl| tdef.envir.current[name] = sl.value; },
			tdef.envir.current[name], labelWidth: 70, numberWidth: 50, unitWidth: 10)
			.round_([0.1, 0.1, 0.01, 0.00001, 0.0001, 0.0001, 0.01][i])
		);
	};




	Button.new(w, 126@20).states_([[\randomize]])
		.action_({
			tdef.envir.target_(d.randSet);
			tdef.envir.morphtask.stop.play;
		});



	Button.new(w, 126@20).states_([[\continuous], [\fadeStops]])
		.value_(tdef.envir.stopAfterFade.binaryValue)
		.action_({ |btn|
			tdef.set(\stopAfterFade, btn.value == 1)
		});

	Button.new(w, 126@20).states_([[\skipWatching], [\skipWaiting]])
		.action_({ |btn|
			[ { skipjack.play }, { skipjack.stop }][btn.value].value
		});

	w.view.decorator.nextLine;



			// skipjack is a task that survives cmd-period:
			// used here for lazy-updating the control views.
	skipjack = SkipJack({
		q.paramRNames.do { |name| ezRangers[name].value_(tdef.envir.current[name]) };
		fdBox.value_(tdef.envir.xfadeTime);

		// mark last settings that were used by color?
		// a separate color when changed?

	}, 0.5, { w.isClosed }, name: tdef.key);

	w.view.decorator.nextLine;

	// make a new layoutView for the 8 presets;
	// put button to switch to that preset,
	// a button to save current settings to that place,
	// and a miniview of the settings as a visual reminder in it.

		// make 8 setButtons
	tdef.envir.setNames.do { |setname, i|
		var minisliders, setMinis;
		var zone = CompositeView.new(w, Rect(0,0,45, 96));
		zone.decorator = FlowLayout(zone.bounds, 0@0, 5@0);
		zone.background_(Color.white);

		Button.new(zone, Rect(0,0,45,20)).states_([[setname]])
			.action_({
				// just switch: // tdef.envir.current.putAll(d[setname] ? ())
				tdef.envir.target = tdef.envir[setname];
				tdef.envir.morphtask.stop.play;
			});

		Button.new(zone, Rect(0,0,45,20))
			.states_([["save" ++ (i + 1)]])
			.action_({
				d[setname] = tdef.envir.current.copy;
				setMinis.value;
			});

		minisliders = q.paramRNames.collect { |paramRname|
			RangeSlider.new(zone, 45@8).enabled_(false);
		};
		setMinis = {
			q.paramRNames.do { |paramRname, i|
				var paramName = q.paramNames[i];
				var myrange = d[setname][paramRname];
				var unmapped = paramName.asSpec.unmap(myrange);
				minisliders[i].lo_(unmapped[0]).hi_(unmapped[1]);
			}
		};
		setMinis.value;
	};

/* 	Some extras:
	a volume slider for simple mixing,
	a popup menu for switching syndefnames;
	a button to stop/start the skipjack for refreshing,
	so one can use numberboxes to enter values.
*/


	EZSlider(w, 225@20, "vol", \amp, { |sl|tdef.set(\vol, sl.value) },
		0.7, false, 20, 36);

	StaticText.new(w, 60@20).string_("synthdef:").align_(\right);
	PopUpMenu.new(w, Rect(0,0,95,20))
		.items_([\pmGab, \pmWide, \pmPerc, \pmPercRev])
		.action_({ |pop| tdef.envir.synName = pop.items[pop.value] });


};
q.makeCloudGui(Tdef(\cloud0))
);

)