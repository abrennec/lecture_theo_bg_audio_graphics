s.boot; // boot the server

// then create the wavetable
q = ();

// create an array with samples
// y = A sin(2πƒt + ø)
q.y = {|q, t, freq, alpha, theta|
	var omega = 2pi * freq;
	alpha * sin((omega* t) + theta)
};

q.alpha = 1; // amplitude 1
q.theta = 0; // zero phase offset
q.freq = 440;
q.numSamples = 2*s.sampleRate.asInteger; //2 seconds


//choose a wavetable

q.wavetable = q.numSamples.collect{|i|
	q.y(i/888000, q.freq, q.alpha, q.theta)
};// higher ->deeper sound


q.wavetable = q.numSamples.collect{|i|
	q.y(i/4000, q.freq, q.alpha, q.theta)
};// lower -> ahhh, make it stop

// create an array with a 2second sine wave at 440 Hz, s.sampleRate
/*q.wavetable = q.numSamples.collect{|i|
	q.y(i/s.sampleRate, q.freq, q.alpha, q.theta)
};*/ //original


//create the buffer
b = Buffer.alloc(s, q.numSamples,2);


b.sendCollection(q.wavetable);

b.play;
b.plot;

//##############################################################################

//{[SinOsc.ar(624, 0, 0.7), SinOsc.ar(625, 0, 0.58)]}.play;

/*(
l = Signal.sineFill(16384, Array.fill(200, {0}).add(1));
r = Array.fill(16384, {1.0.rand2});

m = [Array.newFrom(l), r]; // a multi-dimensional array -> but why?! the doc says they don't work
m = m.lace(32768); // interleave the two collections
b = Buffer.loadCollection(s, m, 2, {|buf|
    x = { PlayBuf.ar(2, buf, BufRateScale.kr(buf), loop: 0) * 2 }.play;
});
)*/

s.boot;
// allocate an array of Buffers and fill them with different harmonics
(
/*b = Buffer.allocConsecutive(8, s, 4096, 1, { |buf, i|
    buf.sine1Msg((1..((i+1)*6)).reciprocal) // completion Messages
});*/

a = {[SinOsc.ar(624, 0, 0.7), SinOsc.ar(625, 0, 0.58)]};

b = Buffer.loadCollection(s, a, 2, {|buf|
    x = { PlayBuf.ar(2, buf, BufRateScale.kr(buf), loop: 1) * 0.5 }.play;
});

)
a.free;

// iterate over the array and free it
b.do(_.free);