<!-- ---  
title: TBAG
author: Till Bovermann, Angela Brennecke
affiliation: Film University Babelsberg KONRAD WOLF
date: Winter term 19/20
---   -->
**Theoretical Backgrounds of Audio and Graphics**

Dr. Till Bovermann | Film University Babelsberg *KONRAD WOLF*

Last Update: 23.07.2019

---

**Table of Contents**
- [Overview of the Course](#overview-of-the-course)
  - [Organization](#organization)
  - [Syllabus](#syllabus)
  - [Projects](#projects)

---

# Overview of the Course

## Organization 

- **TBD**: Mondays 10:00 h - 13:30 h
  - Mondays: 28.10., 04.11., 11.11., 18.11., 25.11., 02.12., 13.01., 20.01., 27.01., (03.02.)
- 3 SWS | 4 ECTS
- 9 lectures in total during winter term as defined in the **CTech Classes Calender**


## Syllabus

+ Introduction & fundamental maths
  + organisation of the course
  + numeric foundations
  + integer arithmetic
    + fixed-point arithmetic 
    + floating point arithmetic
  + mathematical bases
    + time
    + frequency (FFT / fourier transform)
    + cartesic
    + (polar coordinates)
    + (euler)
+ Digital audio fundamentals
  + nyquist theorem
  + audio rendering pipeline (audio architecture)
  + audio buffer processing (“1 sample delay”)
  + latency
+Synthesis
  + oscillation & sound generation
  + types of sound synthesis
    + additive
    + subtractive
    + FM
    + (granular)
+Processing
  + filtering
    + Filter theory – message: filters are built in the time domain, mainly with the help of delays and feedback.
    + HPF / LPF / BPF / Allpass
    + (complex filter design)
  + analysis
    + amplitude tracking
    + pitch tracking
    + overview on [state-of-the-art features](https://en.wikipedia.org/wiki/Audio_analysis)
      + Level and gain
      + Frequency domain analysis
      + Frequency response
      + Total Harmonic Distortion plus Noise (THD+N)
      + Phase
      + Crosstalk
      + Intermodulation Distortion (IMD)
      + Stereo and Surround
+ Computer graphics fundamentals
  + graphic rendering pipeline (overview)
  + Transformations & matrices
    + affine transformations — definition
    + (2D examples)
    + 3D examples
  + 3D objects in space
    + Affine transformations, local vs global space
    + Positioning & movement: Transformation of objects in space
    + Projection & viewing
      + Projective transformations
      + Camera viewing systems, perspective, and light

## Project

Create audio-visual scenes (dioramas) with moving objects and dynamically changing room tone.

Learning aspects: integration of sound and graphics into one coherent environment creating kinetic objects (audio / graphics) and moving (sound) sources.

### Project audio

- Given
  - time-varying control data (OSC message stream) 
  - programming environment: [supercollider](http://supercollider.github.io)
- Task
  - analyse 2 self-made recordings (i.e. from Technology Introductions) for their spectral components and recreate them with controls for tonal and texture quality
  - create sound objects (like e.g. for a radio play) with controls for tonal, texture and positional qualities


### Project graphics

- Given 
  - time-varying control data (OSC message stream) 
  - control 3d model / skeleton (parse incoming OSC data, functions for object updates)
  - sound elements from first project 
- programming environment: Processing 3D
- Task
  - create (abstract) visual environment that represents the place in which the diorama takes place including parameters for lighting, culling, etc.
  - create (abstract) kinematic graphic objects with (high-level) controls for position and shape
