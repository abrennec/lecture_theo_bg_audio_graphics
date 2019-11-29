# Theoretical Backgrounds of Audio & Graphics 


## Exercise 03 

--- 

### Task 3.1

In the lecture you heard about audio buffer properties. One aspect was the way
channels are being represented. What is meant by interleaved and
non-interleaved/planar audio buffers? How does SuperCollider Buffers implement
channels?  Review the documentation from within SuperCollider (`Buffer` help page).


### Task 3.2

Read provided document on audio buffers & latency (in _assets folder).  

+ What is meant by latency?
+ What causes latency and how do you calculate it?


### Task 3.3

Take the example implementation of filling a Buffer with sine waves and play around with the sample rate argument. In which way does the sound change if you provide a sample rate that is (a) lower resp. (b) higher than that of the server?

Read the documentation of `Buffer.loadCollection` and allocate, fill, and play a Buffer with a 2-second stereo sine wave at 624 Hz with Amplitude 0.7 (left) and 625 Hz with Amplitude 0.58 (right). What happens at the loop point?


---

##### Evaluation  

In the practical session, every week one group will be responsible for
presenting their worksheet solutions to the class and sharing a solution or
summary sheet afterwards. Exception: Exercise 1 / Session 2, where every group
has to prepare part of the homework assignment. 

Successful presentation & sharing of (potentially revised) solution sheets will
be tracked per group. Solution sheets must be shared with the class one week
after the presentation the latest.

##### Submission

* Please upload your solutions to GitHub.
