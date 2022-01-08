# Answers to the Worksheet

> Annotation:
> The LaTex code doesn't compile on GitHub for some reason. It works when the file viewed in VSCode though.

# Vectors

What is a column vector vs a row vector?

> A column vectors are the vertical sets of numbers in a matrix and row vectors the horizontal sets.  
> The columns often represent the coordinates of a point, where as the row vectors represent the values of all column vectors associated with the same axis (e.g. all Y axis values).

How do you calculate the dot or inner product?#

> A dot product is calculated by multiplying two vectors (and as alternative: also with the angle between them).  
> One method is multiplying each row of the vectors, then adding these numbers together, creating a *number* (or scalar) in the end.  

What does it tell you if the dot product is 0, < 0 or > 0 ?

> The dot product is *negative* when the vectors are **more** than 90° apart from each other.  
> The dot product is *positive* when the vectors are **less** than 90° apart from each other.
> The dot product is *0* when both vectors are **perpendicular** to each other (exactly 90°).  

What is a normalized vector and how do you calulate it?

> To normalize a vector means to take a vector of any length and change it's length to 1 (or unit length), while keeping it's direction.
> To calculate that, we derive the length / magnitude of the vector by taking the absolute value of the square root of the values within the vector to the power of two and then dividing our original vector by the result of this.  
>
> But I would just use the given commands in the program we're working with:  
> `normalize()` in Processing or `Vector3.Normalize()` in Unity (Note that this will change the vector, whereas using `myVector3.normalized` will keep the original vector, but just uses the normalized vector for the current code).

What is a normal vector?

> A very ordinary vector. :smile:  
> Jokes aside, a normal vector is commonly referring to a vector which is *perpendicular* to a surface in 3D space. It may be distinguished into "inward pointing" and "outward pointing" and is needed for variuos calculations of 3D shapes including, for example, lighting.

# Matrices

What is a matrix generally speaking and what does it consist of?

> A matrix is a rectangular arrangement of numbers (= *scalars*), symbols or expressions, organized in rows and columns and is often used for linear algebra. In a mathematical sense, a matrix is used to represent a mathematical object or properties of such an object.

What does a matrix represent geometrically?

> In computer graphics we use matrices both to represent objects and to calculate transformations of objects. So for us, a matrix represents the *transformation* (e.g. translation, rotation, scale) of an *object* (e.g. a vertex, a 3D object (a set of vertices related/connected to each other), a coordinate system).

What is a transposed matrix?

> The transpose of a matrix is the original matrix, flipped over a diagonal.  
> This also means that a `2 x 3` matrix $A$ becomes a `3 x 2` matrix $A^T$ via transposing.

How do you multiply two matrices?

> To multiply a matrix with another matrix we need to calculate the "dot product" of the rows and columns:  
>
> ![found on mathsisfun.com/algebra/matrix-multiplying](https://www.mathsisfun.com/algebra/images/matrix-multiply-a.svg)
>
> We then do this procedure for all rows and columns,  
hence multiplying a `2 x 3` matrix $A$ with `3 x 2` matrix $B$ results in a `2 x 2` matrix $C$.

Why is order important when multiplying several matrices together (aka "matrix composition")?

> The commutative law of multiplaction does not apply to matrices, $AB ≠ BA$.  
> Matrix multiplication can be seen as geometric translation and rotations.  
> If we take the two different commands:
>
> a) turn left and then walk two steps forward  
> b) walk two steps forward and then turn left
>
> The result will be different and we will not end up in the same point.  
> Very important when hunting for treasures! :pirate_flag:

> Exception: when one of the matrices is the Identity matrix $
I_{dentity} =
  \left[ {\begin{array}{cc}
    1 & 0 & 0 \\
    0 & 1 & 0 \\
    0 & 0 & 1 \\
  \end{array} } \right]$
> Because this is kind of like multiplying by `1`.

# Transformations

1. Given the above 2D transformation (left to right).

* 1.1  What matrix operations are involved?

> Translation: `+6` X units, `+0` Y units

* 1.2 Derive the transformation matrices.

> We add the following matrix to each vertex:
> $A_{translation} =
  \left[ {\begin{array}{cc}
    6 \\
    0
  \end{array} } \right]$

---

2. Given the above 2D transformation (left to right).

* 2.1 What matrix operations are involved?

> 1. Scaling: `*0.5` units
> 2. Translation: `+3.5` X , `+3` Y units

* 2.2 Derive the transformation matrices.

> For scaling, we multiply each vertex with the scalar $0.5$.  
> Alternatively, we multiply the original matrix with this [scaling matrix](https://en.wikipedia.org/wiki/Scaling_(geometry)):
> $A_{scaling} =
  \left[ {\begin{array}{cc}
    0.5 & 0 \\
    0 & 0.5
  \end{array} } \right]$

> For translation, we add the following matrix to each vertex:
> $A_{translation} =
  \left[ {\begin{array}{cc}
    3.5 \\
    3
  \end{array} } \right]$

---

3. Given the above 2D transformation (left to right).

* 3.1 What matrix operations are involved?

> 1. Shearing: check matrix
> 1. Scaling: `*0.25` X , `0.5` Y units
> 1. Translation: `+6.25` X , `+0.25` Y units

* 3.2 Derive the transformation matrices.

> For shearing, we multiply the original matrix with this [shearing matrix](https://en.wikipedia.org/wiki/Shear_matrix):
> $A_{shearing} =
  \left[ {\begin{array}{cc}
    1 & 0 \\
    0.5 & 1
  \end{array} } \right]$

> For scaling, we multiply the original matrix with this [scaling matrix](https://en.wikipedia.org/wiki/Scaling_(geometry)):
> $A_{scaling} =
  \left[ {\begin{array}{cc}
    0.25 & 0 \\
    0 & 0.5
  \end{array} } \right]$

> For translation, we add the following matrix to each vertex:
> $A_{translation} =
  \left[ {\begin{array}{cc}
    6.25 \\
    0.25
  \end{array} } \right]$

---

4. Given the above 2D transformation (left to right).

* 4.1 Is this an affine transformation?

> Yes, because lines and parallels are preserved. (angles and distances may change)

* 4.2 What matrix operations are involved?

> 1. Rotation: $\theta$ = `+ 90°` CCW ( = the mathematical sense of rotation and the "default" for rotation matrices)
> 1. Shearing: check matrix
> 1. Scaling: `*0.5` X , `1` Y units

* 4.3 Derive the transformation matrices.

> For rotation, we multiply the original matrix with this [rotation matrix](https://en.wikipedia.org/wiki/Rotation_matrix):
> $A_{rotation} =
  \left[ {\begin{array}{cc}
    \cos90  & - \sin90 \\
    \sin90  & \cos90
  \end{array} } \right] = 
  \left[ {\begin{array}{cc}
    0  & -1 \\
    1  & 0
  \end{array} } \right]$

> For shearing, we multiply the original matrix with this [shearing matrix](https://en.wikipedia.org/wiki/Shear_matrix):
> $A_{shearing} =
  \left[ {\begin{array}{cc}
    1 & 0 \\
    -0.5 & 1
  \end{array} } \right]$

> For scaling, we multiply the original matrix with this [scaling matrix](https://en.wikipedia.org/wiki/Scaling_(geometry)):
> $A_{scaling} =
  \left[ {\begin{array}{cc}
    0.5 & 0 \\
    0 & 1
  \end{array} } \right]$
> .... I don't think so. But this is taking too long.

I do not have the time / energy / motivation to continue. My math keeps being wrong.

<!-- $\theta \omega \theta$
[funny image: https://www.researchgate.net/figure/Example-of-applying-an-affine-transformation-to-the-deformation-texture-Top-A_fig2_221249004](url) -->
