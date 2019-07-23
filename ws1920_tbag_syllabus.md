<!-- ---  
title: TBAG
author: Angela Brennecke, Till Bovermann
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

- **TBD**: Mondays or Wednesdays 10:00 h - 13:30 h
  - Mondays: 28.10., 04.11., 11.11., 18.11., 25.11., 02.12., 13.01., 20.01., 27.01., (03.02.)
  - Wednesdays: 30.10., 06.11., 13.11., 20.11., 27.11., 04.12., 15.01., 22.01., 29.01., (05.02.)
- 3 SWS | 4 ECTS
- 9 lectures in total during winter term as defined in the **CTech Classes Calender**


## Syllabus

1. Intro to course and fundamental mathematical concepts
   1. Numeric foundations
   2. Mathematical bases (time vs frequency domain, carthesic vs polar/euler coordinates)
2. Digital audio fundamentals
   1. Nyquist theorem
   2. Audio rendering pipeline (analog to digital audio processing)
3. Audio synthesis
   1. Oscillation & sound generation
   2. Types of sound synthesis
4. Audio processing
   1. Filtering
   2. Analysis
5. Audio project
6. Computer graphics fundamentals
   1. Transformations & matrices
   2. Graphics rendering pipeline
7. 3D Objects in space
   1. Affine transformations, local vs global space 
   2. Positioning & movement: Transformation of objects in space
8. Projection & viewing
   1. Projective transformations
   2. Camera viewing systems, perspective, and light
9.  Graphics project




## Projects

Overall idea is to create audio-visual scenes (dioramas) with moving objects a dynamically changing room tone.

Learning aspects: integration of sound and graphics into one coherent environment creating kinetic objects (audio / graphics) and moving (sound) sources.


Project 1 (audio)

- Given
  - time-varying control data (OSC message stream) 
  - programming environment: supercollider
- Task
  - analyse 2 self-made recordings (i.e. from Technology Introductions) for their spectral components and recreate them with controls for tonal and texture quality
  - create sound objects (like e.g. for a radio play) with controls for tonal, texture and positional qualities


Project 2 (graphics)

- Given 
  - time-varying control data (OSC message stream) 
  - control 3d model / skeleton (parse incoming OSC data, functions for object updates)
  - sound elements from first project 
- programming environment: Processing 3D
- Task
  - create (abstract) visual environment that represents the place in which the diorama takes place including parameters for lighting, culling, etc.
  - create (abstract) kinematic graphic objects with (high-level) controls for position and shape


Final Project 

- TBD