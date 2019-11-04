s.boot;

q = ();

// create an array with samples
// y = A sin(2πƒt + ø)

q.y = {|q, t, freq, alpha, theta|
	alpha * sin((2pi * freq * t) + theta)
};

q.alpha = 1; // amplitude 1
q.theta = 0; // zero phase offset
q.freq = 440;
q.numSamples = 2*s.sampleRate.asInteger;


q.y(0, 48000, 1, 0)


100.collect{|t|
	q.y(t, 48000, 1, 0)
}.plot

// create an array with a 2second sine wave at 440 Hz, s.sampleRate
q.wavetable = q.numSamples.collect{|i|
	q.y(i/s.sampleRate, q.freq, q.alpha, q.theta)
};








q.wavetable[0..300].plot; // switch through modes of display with pressing "m"




b = Buffer.alloc(s, q.numSamples);


b.sendCollection(q.wavetable)

b.plot

b.play



