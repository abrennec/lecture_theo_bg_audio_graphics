<!-- ---  
title: Theoretical Backgrounds of Audio and Graphics
author: Angela Brennecke
affiliation: Film University Babelsberg KONRAD WOLF
date: Winter term 20/21
---   -->
**Theoretical Backgrounds of Audio and Graphics - Winter term 20/21**

Prof. Dr.-Ing. Angela Brennecke | a.brennecke@filmuniversitaet.de | Film University Babelsberg *KONRAD WOLF*

---

- [Transformations - Learning Objectives](#transformations---learning-objectives)
  - [Matrices and matrix multiplications](#matrices-and-matrix-multiplications)
    - [Lecture Video](#lecture-video)
  - [Geometric Transformations](#geometric-transformations)
    - [Linear Transformations](#linear-transformations)
      - [Lecture Video](#lecture-video-1)
    - [Affine Transformations and Homogeneous Coordinates](#affine-transformations-and-homogeneous-coordinates)
      - [Lecture Video](#lecture-video-2)
  - [Geometric Transformations by Example](#geometric-transformations-by-example)
  - [Additional Material](#additional-material)
- [Assignments](#assignments)

---


# Transformations - Learning Objectives

**What?**

This lecture strongly deals with mathematics from linear algebra and euclidian geometry. In particular, we will look into the following topics:

- Martrices and matrix multiplication
- Geometric transformations
- Homogeneous coordinates
- Geometric transformations by example

**Why?** 

In computer graphics, geometric objects and geometric transformations are an essential part to the setup and generation of 2d and 3d scenes. Many SDKs and game engines abstract from the underlying mathematics and provide you with hands-on functionality that allows you to setup your scenes nonetheless. This is good. At the same time this can also be limiting as soon as you want to implement your very own ideas which might not be supported by the system you use. Also, understanding the basics of a matrix representation and transformation will also deepen your understanding of the general rendering pipeline steps. Matrices represent transformations from one vector space to another and help speed up computations significantly. It is thus important to get an idea for what kind of information a matrix actually contains and how it can be changed and used.


## Matrices and matrix multiplications

### Lecture Video

The following lecture video will dive into matrix notation, the geometric interpretation of matrices as well as matrix operations that are particularly relevant for computer graphics rendering. The video finishes with a first look into transformations with a matrix and provides you with a practical exercises. Check out the video presentation at the following link and the accompanying slides in the resources folder:

- [Link to Matrices video](https://owncloud.gwdg.de/index.php/s/e9X0LqwUjWcPy4H)
- ~ 40 mins

![screencast](imgs/screencast.png)

---

## Geometric Transformations

### Linear Transformations 

#### Lecture Video

The following lecture video will introduce you to geometric transformations like scaling, shearing, and rotation. These transformations are linear transformations in particular and you will learn about how these transformations can be represented with a matrix as well as how matrix operations like matrix multiplication can help facilitate the rendering process. Check out the video presentation at the following link and the accompanying slides in the resources folder:

- [Link to linear transformations video](https://owncloud.gwdg.de/index.php/s/zwUNl0K7QPoPBPU)
- ~ 50 mins

![screencast](imgs/screencast.png)


### Affine Transformations and Homogeneous Coordinates

#### Lecture Video

This lecture video expands on geometric transformations by introducing affine transformations and adding translation to the group of geometric transformations. With the help of homogeneous coordinates, which are being introduced here as well, it will then be possible to adapt the matrix representation and combine linear and affine transformations in one matrix. Check out the video presentation at the following link and the accompanying slides in the resources folder:

- [Link to affine transformations video](https://owncloud.gwdg.de/index.php/s/3oBG9hhXg0ySf0o)
- ~ 20 mins

![screencast](imgs/screencast.png)

---

## Geometric Transformations by Example

In the code folder, there are a couple of p5.js examples that we will take a look at together. 

Geometric transformations that address the movement and positioning of geometric objects in a 2d or 3d space are usually implemented as corresponding functions ready for use by the developers. In p5.js the functionality for geoemtric transformations is implemented in the individual functions:

- [scaling](https://p5js.org/reference/#/p5/scale)
- shearing
  - [shearing along x](https://p5js.org/reference/#/p5/shearX)
  - [shearing along y](https://p5js.org/reference/#/p5/shearY)
- [rotation](https://p5js.org/reference/#/p5/rotate)
  - [rotation around x](https://p5js.org/reference/#/p5/rotateX)
  - [rotation around y](https://p5js.org/reference/#/p5/rotateY)
  - [rotation around z](https://p5js.org/reference/#/p5/rotateZ)
- [translation](https://p5js.org/reference/#/p5/translate)

Moreover, you need to be aware of the fact that in a OpenGL-based environment, any kind of matrix definition in the code will affect all of the geometry -- unless you make use of the functions

- [push](https://p5js.org/reference/#/p5/push) 
- [pop](https://p5js.org/reference/#/p5/pop)

These functions, often named pushMatrix() and popMatrix() in graphics libraries, make sure that the overall state of the system remains as is and the next transformations will only affect the geometry that is drawn inside of "push" and "pop" commands.

Finally, you can also specifie and apply a matrix yourselves and I would like you to try out in very simple examples how you could exchange a pre-defined transformation function like "scaling" with a manually specified "applyMatrix" function:

- [applyMatrix](https://p5js.org/reference/#/p5/applyMatrix)
- [resetMatrix](https://p5js.org/reference/#/p5/resetMatrix)



---

## Additional Material

An excellent practical approach to the mathematics of computer graphics was created by Dan Shiffman and is accessible online:
- Daniel Shiffman's p5 tutorials on transformations:
  - [Part 1](https://www.youtube.com/watch?v=o9sgjuh-CBM)
  - [Part 2](https://www.youtube.com/watch?v=pkHZTWOoTLM)
  - [Part 3](https://www.youtube.com/watch?v=IVMvq9rd8dA)
  - [3D rendering](https://www.youtube.com/watch?v=p4Iz0XJY-Qk)
  - [Matrix multiplication for 3D rendering](https://www.youtube.com/watch?v=tzsgS19RRc8)

Another excellent approach to linear algebra and matrices was created by and is accessible online:


--- 

# Assignments

Review the script and video lectures.

I would like you to check out the practical exercises in the code folder carefully and play around with the code, change the parameters of the geometric functions and also use applyMatrix in your examples.

Other than that, I would like you continue working on the graphics project. Add an animation or an interaction to your piece that uses geometric transformations.
