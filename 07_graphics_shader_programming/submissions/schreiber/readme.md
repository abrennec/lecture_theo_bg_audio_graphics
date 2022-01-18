## Shader Exercises

For the shader exercises I stuck to modifying one sketch: the vertex displacement, as I found this one the most interesting.
The sketch is interactive:

- Press `Y` (= "yes") to make the head shake up and down.
- Press `N` (= "no") to make the head shake left to right.
- Press `C` (= "control") to make the head follow your mouse on the screen.
- `Click` the mouse button to make the shader go crazy!

The 3D model may be flipped upon start. Pressing any other button than the ones specified above will make face the right direction (and cancel any currently activate movement).

The shader gets progressively crazier over time, as it still has `frameCount` in it.
A little preview:

![shader progression png](./imgs/shaderInsanityProgression.png)

---

## Final Project Concept

For the final project I want to create a sketch which is an "endless tunnel" through which the camera moves.
In front of the camera will be a centrepiece which is a writhing torusknot. This centrepiece will be sound-reactive and spin around.

### Inspirations for the endless tunnel / background:
| ![tunnel1](https://media2.giphy.com/media/3o7TKrOrms2QqxGchO/giphy.gif?cid=790b7611e8f6db66fd99c653ebde931b4f582d18fdf9d734&rid=giphy.gif&ct=g)  | ![tunnel2](https://media4.giphy.com/media/TEgQ3PNiXby6I/giphy.gif?cid=ecf05e47l5zy8jn6u78u00am3y02rlevc2jaswa5eszj1442&rid=giphy.gif&ct=g) | ![tunnel3](https://media1.giphy.com/media/l378qyFhDbnMomICc/giphy.gif?cid=ecf05e479m5lwsr43y84bfiqbheexblormk9f32yf59rmdub&rid=giphy.gif&ct=g) |
|:---:|:---:|:---:|
| https://giphy.com/gifs/art-cinema-4d-3o7TKrOrms2QqxGchO | https://giphy.com/gifs/animation-loop-motion-graphics-TEgQ3PNiXby6I | https://giphy.com/gifs/black-and-white-trippy-abstract-l378qyFhDbnMomICc |

As you can see from my inspirations, my preferred style for this would not be singular geometry, but many simple shapes - aligned in a tunnel through which the camera moves. However, I do not yet know how I would implement this.

### Inspirations for the centrepiece:
| ![knot1](https://media1.giphy.com/media/tJ2xRBV9jbWkxmCJnk/giphy.gif?cid=790b761176aae266c3ab590664eb5e617e636472e6a16094&rid=giphy.gif&ct=g)  |  ![knot2](https://media2.giphy.com/media/ReB6gIHAFcim3jTGmN/giphy.gif?cid=ecf05e47lzcrkk8o43fqz55pwukj31w93i7gkju0c7zpqxyl&rid=giphy.gif&ct=g)  | ![knot3](https://media0.giphy.com/media/fBOdXBxwoydCs7RK7b/giphy.gif) 
|:---:|:---:|:---:|
| https://giphy.com/gifs/trapcode-trapcodetao-knot-tJ2xRBV9jbWkxmCJnk | https://giphy.com/gifs/ReB6gIHAFcim3jTGmN | https://giphy.com/gifs/trippy-abstract-pi-slices-fBOdXBxwoydCs7RK7b |

With the centrepiece I want to see where I the process takes me. THREE.js has `torusKnotGeometry` which already looks pretty cool.

Parameters in the scene which I may or may not make interactive and/or sound-reactive:

Background tunnel:

- detail of the geometry/segments (no smooth transition)
- material parameters like colour, shininess, wireframe, ...
- several tunnels with lower detail (e.g. `8`), which shear off/out
- several smaller geometries, which are animted (how?)

Centrepiece:

- `p` & `q` values of `torusKnot` (no smooth transition)
- radius of the knot (= "size" of the whole knot)
- radius of the tube which creates the knot
- animated texture / UVs
- funky shader (vertexDisplacement), whose values escalate on sound input

Other:

- light positions
- light params like colours, intensity, ...
- camera values (post processing? e.g. color abberation)

### Open Questions

Is THREE.js fitting for the plan? Or should I switch to p5?  
I still do not know how to interweave sound elements into my sketch.  
Another issue for me is how to make my visualisation actually fit to the music piece I created. Right now I still feel like both pieces exist in their own world, rather than the same.  


