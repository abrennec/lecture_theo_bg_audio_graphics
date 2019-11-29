// Wavetable Oscillator — a teaser

// first boot the server
s.boot;

// a place to put things
q = q ? ();


(
// definitions
q.numPoints = 1024;

// simple sine wave
q.waveTable = Wavetable.sineFill(q.numPoints, [1], [0]);

// allocate a buffer for wavetable playback
q.buffer = Buffer.alloc(s, q.waveTable.size, 1);

// plot a wavetable
q.plotFFT = {|q, wavetable|

	var real = wavetable.asSignal;
	var size = real.size;
	var imag = Signal.newClear(size);

	var cosTable = Signal.fftCosTable(size);
	var complex;

	complex = fft(real, imag, cosTable);

	[real, complex.magnitude/40].plot
};

// send wavetable to buffer on server
q.loadFromWavetable = {|q, buffer, wavetable|
	buffer.sendCollection(
		wavetable
	);
	// return value
	wavetable;
};

// send signal to buffer on server
q.loadFromArray = {|q, buffer, array|
	var wavetable;

	// convert array opf floats into wavetable format
	wavetable = array.as(FloatArray).as(Signal).asWavetable;

	q.loadFromWavetable(buffer,
		wavetable
	);
	// return wavetable
	wavetable;
};


)


// plot a wavetable
q.waveTable.plot;

// size of a wavetable
q.waveTable.size


// load the wavetable into a buffer on the server
q.loadFromWavetable(q.buffer, q.waveTable);
// plot the buffer
q.buffer.plot; // looks awkward, see WaveTable helpfile (Advanced notes) for details

(
// play the wavetable
Ndef(\wavetable).addSpec(
	\freq, ControlSpec(20, 20000, 'exp', 0, 440, " Hz")
);


Ndef(\wavetable,{ |bufnum=0, freq = 300|
	Osc.ar(
		bufnum: bufnum,
		freq: freq,
	)!2
});

Ndef(\wavetable).set(\bufnum, q.buffer.bufnum);
Ndef(\wavetable).vol = 0.3;
)

// open the GUI window and hit play
Ndef(\wavetable).edit;


(
// simple sine wave
q.waveTable = Wavetable.sineFill(
	size: q.numPoints,
	amplitudes: [1],
	phases: [0]
);
q.waveTable.plot;
q.loadFromWavetable(q.buffer, q.waveTable);
)

(
// band-limited saw-wave (11 harmonics)
q.waveTable = Wavetable.sineFill(
	size: q.numPoints,
	amplitudes: [1, 1/2, 1/3, 1/4, 1/5, 1/6, 1/7, 1/8, 1/9, 1/10],
	phases: 0!10
);
q.waveTable.plot;
q.loadFromWavetable(q.buffer, q.waveTable);
)

(
// band-limited saw-wave (11 harmonics, random phases)
q.waveTable = Wavetable.sineFill(
	size: q.numPoints,
	amplitudes: [1, 1/2, 1/3, 1/4, 1/5, 1/6, 1/7, 1/8, 1/9, 1/10],
	phases: {2pi.rand}!10
);
q.waveTable.plot;
q.loadFromWavetable(q.buffer, q.waveTable);
)



(
// band-limited saw-wave (512 harmonics)
q.waveTable = Wavetable.sineFill(
	size: q.numPoints,
	amplitudes: {|i| 1/(i+1)}!512,
	phases:     0!512
);
q.waveTable.plot;
q.loadFromWavetable(q.buffer, q.waveTable);
)

(
// band-limited saw-wave (512 harmonics)
q.waveTable = Wavetable.sineFill(
	size: q.numPoints,
	amplitudes: {|i| 1/(i+1)}!1024,
	phases:     0!1024
);
q.waveTable.plot;
q.loadFromWavetable(q.buffer, q.waveTable);
)



(
// ramp from float-array
q.waveTable = q.loadFromArray(
	q.buffer,
	Array.fill(q.numPoints, {|i| i/q.numPoints * 2 -1});
);
q.waveTable.plot;
)

(
// noise from float-array
q.waveTable = q.loadFromArray(
	q.buffer,
	Array.fill(q.numPoints, {|i| rand2(1.0)});
);
q.waveTable.plot;
)



// GUI to manually set samples with multispliders

(
q.window = Window.new("wavetable", (q.numPoints + 20)@300).front.decorate;
q.mSlider = MultiSliderView(q.window, q.window.view.bounds.extent - 10@10).size_(q.numPoints).indexThumbSize_(1.0).elasticMode_(1).isFilled_(true);

q.mSlider.action = {|me| q.loadFromArray(q.buffer, (me.value * 2 - 1).as(FloatArray)) }
)

