<!-- ---  
title: Theoretical Backgrounds of Audio and Graphics
author: Angela Brennecke
affiliation: Film University Babelsberg KONRAD WOLF
date: Winter term 22/22
---   -->
**Theoretical Backgrounds of Audio and Graphics - Winter term 21/22**

Prof. Dr.-Ing. Angela Brennecke | a.brennecke@filmuniversitaet.de | Film University Babelsberg *KONRAD WOLF*  
Christian Halten | halten@skylife.de

---

- [Theoretical Backgrounds of Audio and Graphics Applications](#theoretical-backgrounds-of-audio-and-graphics-applications)
- [Technical Requirements](#technical-requirements)
- [Organization of the Course](#organization-of-the-course)
  - [General Information](#general-information)
  - [Method of Instruction](#method-of-instruction)
    - [Weekly Sessions](#weekly-sessions)
    - [Practical Work](#practical-work)
  - [Evaluation and Grading](#evaluation-and-grading)
- [Learning Content](#learning-content)
  - [Objectives](#objectives)
  - [Syllabus and Dates](#syllabus-and-dates)
  - [Communication and Materials](#communication-and-materials)
    - [Platforms](#platforms)
  - [Reading Materials and Resources](#reading-materials-and-resources)
    - [Maths](#maths)
    - [Audio](#audio)
    - [Graphics](#graphics)

---

# Theoretical Backgrounds of Audio and Graphics Applications

This course provides you with an introduction to the theoretical backgrounds of digital audio and graphics software applications. It is split into one part that focuses on different topics in the field of audio such as digital audio production, audio processing, synthesis or music computing. The second part focuses on 3D computer graphics and in particular on 3D models and vertex meshes, matrix transformations or triangulation, and usually ends with an introduction to shader programming. This term, we might diverge from the strict separation into audio and graphics to interweave both aspects more closely.

The overall term project that you will be working on will be the development of an interactive audio visual album. Every student is supposed to add their own track. Each track of this specific album will consist of an audio track in the lines of musique contrete and an interactive graphics sketch made with processing. 

# Technical Requirements

For this course you will work with 

- Reaper or any other DAW
- Processing v4
- Github
- ... ?


# Organization of the Course

## General Information 

- Wednesday 10:00 h - 13:30 h
- Module 5 | 3 SWS | 4 ECTS
- 10 sessions in total, sessions 9 & 10 only half of time for project coaching and presentation of the results.
- Participation in the lectures is **not compulsory**. **However**, in order to pass the course and receive a grade, you need to collect points. See the [Evaluation and Grading](#evaluation-and-grading) section for the details.


```diff
- The course will be held in person until further notice. 
```

## Method of Instruction

The course will use tools and technique from **flipped classroom** and **blended learning** approaches. For example, there will be pre-recorded lectures such that students can work through the materials on their own and in their own pace online and offline. The weekly sessions will focus on live discussions, project work, and exercises.

Make use of the **[Github team](https://github.com/orgs/ctechfilmuniversity/teams/ws2122_tbag)** when you are stuck and post your questions there. If you cannot find a solution, get in touch with your tutors. 

### Weekly Sessions

Each week, new learning materials and assignments will be published. The time from 10 to 13:30 will be used to work through the materials in the group, in smaller teams or on an individual basis. Moreover, there will be homework assignments to deepen the understanding of the learning materials and/or to work on the term projects.

### Practical Work

- Practical exercises will be part of the lecture sessions to put theory to practice right away.
- Two smaller term projects (the development of your audio track and the development of a graphics sketch) will have to be taken to pass the course and collect points for the final grade. These will be combined into an interactive album where every student contributes their track.
- Group work is welcome.


## Evaluation and Grading 

In order to **pass the course**, you need to submit the final project and a short documentation (one pager) in addition to a presentation of your results in the last session. Course work and practical exercises are designed to help you develop your final project.

For CTech students there will be a **grade**. The grade will be based on the grades received for the term projects and the final exercise. 

### Grading Breakdown <!-- omit in toc -->

* 40 pts - Term exercises and homework 
  * 20 pts Audio tasks 
  * 20 pts Graphics tasks 
* 50 pts - Final project which is intended to combine your audio track and graphics sketch 
* 5 - 10 pts can be awarded for excellence of work and high quality  submissions.

### Grading criteria <!-- omit in toc -->

* Correctness of the task
* Quality of the result
* Technical accuracy (i.e., consistent naming conventions, correct spelling, clean folders (no log files), etc.)
* Presentation in class (informal)
* Documentation (one pager that briefly outlines your artistic approach, learnings during the course, how you relate audio and graphics in your final project, and final reflection)


# Learning Content

## Objectives

Main objective of this course is to get an understanding of digital audio processing as well as 3d computer graphics. The course is split into two parts, audio rendering and graphics rendering. You will learn about mathematical concepts and how they are applied to digital audio and graphics.

The first part, audio rendering, introduces you to the fundamentals of sound and hearing perception, digital audio processing and production as well as sound synthesis and music computing. The theoretical parts will be accompanied with practical exercises so that you can apply the concepts and ideas directly. The notion of sounds in space will be an overarching theme to make you familiar with spatial hearing and sound production. 

In the second part, graphics rendering will be in the foreground of the lecture. Here you will be introduced to the basic concepts of 3D computer graphics and the graphics pipeline. In particular, you will learn about the mathematical concepts behind 3D models, model transformations, triangulation, as well as vertex shader programming. Objects in space will also be an overarching theme and the theoretical concepts will be accompanied with practical exercises as well.

At the end of the lecture, a final exercise will allow you to combine both fields in an application and to explore the sounds and objects in space (hopefully!).

## Syllabus and Dates

```diff 
- The syllabus is still subject to change.
```

03.11.21 - **Audio & Project Intro** (4 hrs) > Christian
  - Intro to the course & main project
  - Computer & music history / musique concr??te / MIDI
  - Basics of sound, digitization
  - Mood boards and project work
  - Homework: Create mood board and track listing

17.11.21 - **Audio Production / DAWs** (4 hrs) > Christian
  - Audio rendering
  - DAWs and plugin concepts
  - Production steps and workflows
  - Mood board and track listing discussion
  - Homework: Create multitrack arrangement

24.11.21 - **Graphics Rendering** (4 hrs) > Angela
  - Computer graphics history
  - Graphics rendering pipeline
  - Euclidian geometry and vertices
  - 3D geometric objects and triangles
  - Homework: Time & motion -> Create animations

01.12.21 - **Sound Synthesis** (4 hrs) > Christian
  - Sound generation and basic waveforms
  - Sound synthesis
  - Analysis and filter
  - Subtractive synthesis by example
  - Multitrack arrangement discussion
  - Homework: Create 3 sounds with 3 different synthesis types each (9 in total) to fit the project

01.12.21 - **Building Bridges** (4hrs) > Christian
  - Relating audio and graphics
  - Sound FX and 3D space
  - Practical exploration & discussion / group work

15.12.21 - **Transformations** (4 hrs) > Angela
  - Martrices and matrix multiplication
  - Geometric transformations
  - Homogeneous coordinates
  - Geometric transformations by example

12.01.22 - **Shader programming** (4 hrs) > Angela
  - The rendering pipeline revisited
  - Vertex shaders and fragment shaders
  - Attributes, varying, and uniforms
  - Shader programming

19.01.21 - **Integration** (4hrs) > Angela, India & Christian
  - Shader programming continued
  - Integrating audio and graphics
  - Project outline
  - Album work

26.01.2022 - Project work and questions (1hrs) > Christian (Angela)
  - Consultations
  - Technical and artistic feedback

16.02.2022 - Final presentations (2hrs) > Angela & Christian
  - Projects presentation
  - Course wrap-up

## Communication and Materials

### Platforms

As a communication platform, we will use [GitHub.com](https://github.com/) to share code, lecture materials, comments, and submit homework and project assignments.

- [GitHub repository (public)](https://github.com/ctechfilmuniversity/lecture_theo_bg_audio_graphics/)
- [GitHub Wiki (public)](https://github.com/ctechfilmuniversity/lecture_theo_bg_audio_graphics/wiki)
- [GitHub team (public)](https://github.com/orgs/ctechfilmuniversity/teams/ws2122_tbag)


The repository will be used to share scripts (usually as readme.md) and slides, coding examples, homework and project materials. The Wiki will be maintained by the students to share information that might be useful for everyone, for example, dos and don'ts, useful links, and so on. The team will be used for discussion, comments, notes and any important announcements.

To stay tuned with the materials, clone the main repo:

```
git clone https://github.com/ctechfilmuniversity/lecture_theo_bg_audio_graphics

```

---

## Reading Materials and Resources

The following references have served as resources for this lecture and are recommended to dive deeper into the different topics if you are interested.

### Maths

- Semesterapparat at Filmuni's Library called ???TBAG???
- Papula, Lothar (2014): Mathematik f??r Ingenieure & Naturwissenschaftler Band 1. 14. ??berarb. Aufl., Wiesbaden: Springer Vieweg.


### Audio

- Burg, J., Romney, J. & Schwartz, E. (2014): Digital Sound and Music. Concepts, Applications, and Science. http://digitalsoundandmusic.com
- Burk, P., Polansky, L., Repetto, D., Roberts, M. & Rockmore, D. (2011): Music and Computers. A Theoretical and Historical Approach. http://cmc.music.columbia.edu/MusicAndComputers/
- Howard, D.M. & Angus, J.A.S. (2009): Acoustics and Psychoacoustics. 4th Edition. Oxford, UK: Focal Press. 
- Smith, S. W. (2011): The Scientist and Engineer???s Guide to Digital Signal Processing. http://www.dspguide.com
- Sethares, W.A. (2005): Tuning, Timbre, Spectrum, Scale. 2nd Edition. London, UK: Springer-Verlag.
- Watkinson, J. (1998): The Art of Sound Reproduction. Focal Press. 
- Parviainen, T. (2016): Learn Web Audio from the Ground Up, Part 1: Signals and Sine Waves. http://teropa.info/blog/2016/08/04/sine-waves.html
- Smus, B. (2013): WebAudio API. O???Reilly Media. Free.
- Hall, D.E. (2008): Musikalische Akustik. Schott, Mainz.


### Graphics

- Kouichi Matsuda & Roger Lea (2013): WebGL Programming Guide. CRC Press.
- Modern JavaScript Tutorial: https://javascript.info
- Buss, S. (2003):  3D Computer Graphics???A Mathematical introduction with OpenGL. Cambridge University Press, New York, NY, USA.
- Shiffman, D. (2012): Nature of Code. https://natureofcode.com/book/
- Learn Computer Graphics from Scratch: https://www.scratchapixel.com
- [WebGL fundamentals](https://webglfundamentals.org)

--- 

