<!-- ---  
title: Theoretical Backgrounds of Audio and Graphics
author: Angela Brennecke
affiliation: Film University Babelsberg KONRAD WOLF
date: Winter term 20/21
---   -->
**Theoretical Backgrounds of Audio and Graphics - Winter term 20/21**

Prof. Dr.-Ing. Angela Brennecke | a.brennecke@filmuniversitaet.de | Film University Babelsberg *KONRAD WOLF*

---

- [Learning Objectives -- Shader Programming I](#learning-objectives----shader-programming-i)
  - [What?](#what)
  - [Why?](#why)
- [Intro to Shaders](#intro-to-shaders)
  - [Revisiting the Rendering Pipeline](#revisiting-the-rendering-pipeline)
  - [Implementation and Code Examples](#implementation-and-code-examples)
    - [Shaders, Variables, GLSL Versions](#shaders-variables-glsl-versions)
      - [Variable Qualifiers](#variable-qualifiers)
    - [Important Variables Type Qualifiers](#important-variables-type-qualifiers)
  - [Further Material](#further-material)
- [Assignments](#assignments)
  - [Shader Exercises](#shader-exercises)
  - [Final Project](#final-project)

---


# Learning Objectives -- Shader Programming I

## What?

In this session, we will start to take a first look into shader programs, what they have to do with the rendering pipeline and how they are basically functioning. The topics are as follows:

- The rendering pipeline revisited
- Vertex shaders and fragment shaders
- Uniforms and attributes
- OpenGL Shader Language

## Why?

Shader programming is a very interesting and a very powerful way to manipulate and enhance the shape and visual looks of geometric objects. At the same time, understanding how to program a shader is not that easy at first glance. It requires a basic knowledge of how computer graphics are rendered and processed in general.

<!-- ## Objects

Geometric objects are almost always defined by two groups of properties:

- **Geometric parameters** to define the object's shape 
  and to position the object in the scene.
- **Materials** to define the object's shape and looks with the help of textures or visuals (color information) or specific material properties like reflectivity, mass, elasticity, for instance.

We will focus on geometric parameters here. -->


# Intro to Shaders

"Shaders" are small programs that can be executed on the GPU on a **per-vertex** and **per-pixel** basis to speed up and further enhance the rendering and image generation process. 

Technically, a polygonal mesh is specified or loaded as a 3d model (e.g., *.obj file) in the application program. The respective vertex data and all of the corresponding vertex specifications (positions, color or texture information) are passed on to the GPU. Each vertex is then processed, rasterized and finally written into the frame buffer based on the steps specified by the rendering pipeline.

## Revisiting the Rendering Pipeline

The following illustrations present the rendering pipeline steps in a new light and indicate at which point a shader program can be used to manipulate data:

![rendering_pipeline](imgs/evasgl-graphics-pipeline.png)
*Image source: https://www.enlightenment.org/playground/evas-gl.md*

Although the illustration was taken from the documentation of a specific graphics library called "evas-gl", the illustrated steps are universal for a rendering pipeline. Check this link for an animated illustration of how shaders work: 
- https://webglfundamentals.org/webgl/lessons/resources/fragment-shader-anim.html

As you can see, there are two different shader types depicted:

- **Vertex shader** to adjust and process the geometric vertex data and operate on one vertex at a time. 
  - Input: Vertex in world space
  - ***Output: Projected vertex position in clip space (-1.0 to 1.0, normalized device coordinates)***
  - The vertex shader is called and executed per vertex!
- **Fragment shader** to adjust and process the rasterized fragment data and operate on one fragment at a time.
  - Input: Fragment
  - ***Output: Pixel color of the vertex***
  - The fragment shader is called and executed per pixel!

Meanwhile, there are also geometry and tesselation shader programs available but they are not yet supported on all platforms or graphics libraries. For instance, p5.js only supports vertex and fragment shader programs.

The following illustration depicts the rendering pipeline as implemented by WebGL:

![rendering_pipeline](imgs/webgl_graphics_pipeline.jpg)
*Image source: https://opentechschool-brussels.github.io/intro-to-webGL-and-shaders/log1_graphic-pipeline*


As you can see, the vertex shader will be executed first, the fragment shader will be executed subsequently. In particular, a **vertext shader** takes care of the following:

> "A vertex shader processes each vertex of the rendered object and changes its properties, such as position, normal, color, and some custom attributes. It can be used for geometric transformations of 3D objects." [Denis Perevalov, "Mastering openFrameworks", Chap. 8].


In contrast, a **fragment shader** is resonsible for finally calculating the final pixel color:

> "A fragment shader processes the color and depth of a pixel which is ready to be rendered to the screen or screen buffer. A fragment shader can be used for implementing postprocessing effects, and also for more complex image processing and generation." [Denis Perevalov, "Mastering openFrameworks", Chap. 8].

If you want to use either a vertex or a fragment shader or both in your program, you need to specify and enable both of them. openFrameworks simplifies this process with the ofShader object.

## Implementation and Code Examples 

Let's take a look at a first shader application. Check out the code folder code/shaders.

Important notes: 

- **Shader programs** are writtein in **individual source code files**. Common naming conventions are 
  - "myShader.vert" and 
  - "myShader.frag". 
- These programs are then simply **loaded into the application program** and take care of how the geometry is rendered.
- Shader programs also use their own language, for example, **OpenGL Shading Language (GLSL)** which is a C-like language.

### Shaders, Variables, GLSL Versions

When working with shaders, it is important to understand that - due to their nature as being components of the rendering pipeline - specific variables like, e.g.,
-  **gl_Position** 
-  **gl_ModelViewProjectionMatrix**
-  **gl_FragColor**

 etc., are **built-in variables** provided by the underlying OpenGL library! 

These variables are used to access and change OpenGL-specific function states although their use as fixed built-in values has been removed with latest GLSL versions. Nonetheless, older versions are widely supported on many systems which is why you should know about them. 

The list of built-in variables used by GLSL and OpenGL can be found at 
- https://www.khronos.org/registry/OpenGL-Refpages/gl4/index.php

#### Variable Qualifiers

<!-- As mentioned above, the use of the built-in variables, however, changed with latest GLSL versions. The GLSL version you can use depends on the OpenGL version supported on your system and graphics card. 
Here, we will be working with GLSL 1.2 which will work on most machines. An overview of OpenGL and GLSL versions can be found at 
- https://www.khronos.org/opengl/wiki/Core_Language_(GLSL) -->


### Important Variables Type Qualifiers

Basically, you will work with three different types of variable type qualifiers: 

- **Attributes** -- vertex shader only!
  - Attribute variables are **global variables** specifed and processed **per vertex**. They correspond to the internal OpenGL attribute settings and are only available to the vertex shader.
  - In p5.js, you can specify vertices by using the vertex() function. The specified values are then handed over to the underlying OpenGL library for further processing which uses its pre-defined attribute variables to store the values internally and hands those over to the shader. 
  - OpenGL Examples -- whenever you use a library like p5 or WebGL, these will be called differently ... :  
    - gl_Vertex, 
    - gl_Color, 
    - gl_MultiTexCoord0, 
    - gl_Normal, 
    - ...
- **Uniform**
  - Uniform variables can be specified in the application (i.e., sketch.js) and can be handed over to the shader program directly (compared to how attributes are processed, for instance). 
  - They are used to, for example, to hand over information interactively from the application to the shader program.
  - Uniform variables are **global variables** applied to the entire **primitive** that is being processed.
  - Examples: User defined variables as well as dedicated OpenGL uniforms like 
    - gl_ProjectionMatrix, 
    - gl_ModelViewMatrix, 
    - gl_NormalMatrix, 
    - ...
- **Varying**
  - Varying variables can be used to exchange data between the shaders themselves; i.e., you can specify a varying variable in the vertex shader and retrieve the information inside of the fragment shader for further processing.
  - There are two sets of varying variables, one for the vertex and one for the fragment shader.
  - Examples: 
    - gl_Color, 
    - gl_TexCoord\[\], 
    - gl_FrontColor, 
    - ...
Variable type qualifiers can be used inside of your sketch.js file and be handed over to the shader programs for an execution on the GPU.

<!-- Every shader program has an input and output values. 
The vertex shader output is stored in the gl_Position variable. The 
fragment shader output is stored in the gl_FragColor variable.

Input values to both shader programs are specified by variable qualifiers.
Input values can either be built-in variables that come with OpenGL/WebGL like "attributes" (only available in the vertex shader) or "uniforms". Attributes and uniforms are both global variables. Attributes may 
change per vertex (i.e., a position vector), whereas uniforms may change per primitive (i.e., a matrix value). -->


---

## Further Material

Certainly, the possibilites that come with shader programming are enormous. In particular, when it comes to light effects, different texture processing methods, and more. If you want to dive deeper into shader programming, you need to get an understanding of the different illumination models and a deeper understanding of the rendering pipeline steps. Here is a list of further materials that can help you with this as well as a list of very comprehensible shader tutorials:

**Important References for the Beginner**
- Doucmentation/references
  - [GLSL - p5.js contributor docs on WebGL with details on Shader specifics, variables and qualifiers](https://github.com/processing/p5.js/blob/main/contributor_docs/webgl_mode_architecture.md)
  - WebGL Reference on GLSL data types, operators, and built-in functions
    - http://learnwebgl.brown37.net/12_shader_language/glsl_data_types.html
    - http://learnwebgl.brown37.net/12_shader_language/glsl_mathematical_operations.html
    - http://learnwebgl.brown37.net/12_shader_language/glsl_builtin_functions.html

--- 

**Docs, Tutorials, and more advanced References**
- Shader Tutorials
  - [GLSL - p5.js Shaders Tutorial](https://itp-xstory.github.io/p5js-shaders/#/)
  - [GLSL - Typhoon Labs OpenGL Shader Tutorial](https://www.opengl.org/sdk/docs/tutorials/TyphoonLabs/)
  - [GLSL - Lighthouse 3D (Shader) Tutorials](http://www.lighthouse3d.com/tutorials/)
  - [HLSL - Shader Tutorials for Unity](https://www.ronja-tutorials.com) 
- More information on WebGL and Shaders can be found here
  - https://opentechschool-brussels.github.io/intro-to-webGL-and-shaders/log0_setting-up
- WEBGL Fundamentals:
  - https://webglfundamentals.org/webgl/lessons/webgl-shaders-and-glsl.html
  - https://webglfundamentals.org/webgl/lessons/webgl-how-it-works.html
- Interesting tutorial with noise functions:
  - https://mattdesl.github.io/workshop-webgl-glsl/#/
- For more information on the latest list of shader types supported by OpenGL and latest GLSL version specifications, visit 
  - https://www.khronos.org/registry/OpenGL/specs/gl/
  - https://www.khronos.org/registry/OpenGL/index_gl.php
- OpenGL Tutorials
  - [OpenGL 3.3 Tutorial](http://www.opengl-tutorial.org)
  - [Learn OpenGL Tutorial](https://learnopengl.com/)
- Rendering in General
  - [Realtime Rendering](http://www.realtimerendering.com)
  - [Physically based rendering (also available at Filmuni Library)](https://www.pbrt.org)
  - [scratchapixel](https://www.scratchapixel.com)
- Computer Graphics Lectures
  - [Uni Freiburg Youtube Channel](https://www.youtube.com/channel/UC61bSY1sj4zTPa38dpqgRhw/videos)
    - [Intro to Computer Graphics - Image Processing & CG](https://www.youtube.com/watch?v=E2n6NEB8fis)
    - [Intro to Advanced Computer Graphics - Rendering](https://www.youtube.com/watch?v=VFvT2wjo4uc)

---


# Assignments

## Shader Exercises

Examples Review 
- Review the code examples for shaders and get an understanding of what is happening. Every example, except for the first two examples "intro" and "functions", comes with a short readme that provides an idea for changing and exploring the code. 
- You can find the code examples in the github repo or as a p5 editor collection online at 
  - https://editor.p5js.org/abrennec/collections/TGI5M8556


In general, you might want to  
- Add a 3D geometry to the scene and shade it.
- Instead of using one color for all vertices, use a color for every individual vertex individually.
- Use your own geometry / project idea in conjunction with a simple shader.
- Make use of uniforms to send data like time/frameCount/frameRate or mouse interaction information from the application to the shader program.
- Try to use different shaders for different objects.
- Play around with the built-in functions like "T sin(T angle)" to change vertex positions (see the reference card in the ressources).
- Create a shape in the sketch that does not need the modelview * projectionmatrix multiplication.


## Final Project

- Prepare the scope for your final project
  - What would you like to develop?
  - How would you like to connect sound and graphics?
- Break these two questions down into technical tasks to discuss them next time in class.

