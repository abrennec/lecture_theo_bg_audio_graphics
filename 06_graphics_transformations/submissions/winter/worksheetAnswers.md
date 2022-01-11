# Worksheet Answers Winter
## What is a column vector vs a row vector?
Generally speaking, there is no fundamental difference between the two since you can transpose a matrix and I'd still represent the same space (right?). They are basically both a collection of numbers.
## Calculating the inner dot product
```
Vector a * Vector b = a1*b1 + a2*b2
```
## What does it tell you if the dot product is...
### ... 0?
The angle between the two vectors is a perfect right angle.
### ... <0?
The angle is bigger than 90 degrees, aka a "Stumpfer Winkel".
### ... >0?
The angle is smaller than 90 degrees, a "Spitzer Winkel". 

## What is a normalized vector?
A vector with a fixed length of 1. This is useful because the vector still retains its direction, while its length is indeed "normal". To calculate it, we have to divide the vector a by its own length |a|, which we can calculate using the "Satz des Phytagoras": √a1^2+a2^2 ....
I had to look this up. 

## What is a normal vector?
A vector with a perfect right angle in relation to a surface, such as a face in computer graphics. If I remember correctly, it is needed to simulate light among other things. 

## What is the Matrix??
![The only right answer](https://cdn.quotesgram.com/img/39/29/366193675-bbba93dcdffb0a882b764473fabc8af7.jpg)  
A matrix is a collection collection of ... things in rows and columns: an array. Most of the time it's numbers, but it can also contain any other data such as string.

## What does a matrix represent geometrically?
A set of vectors that make up a geometry? I'm not that sure. 
## What is a transposed matrix?
A matrix with its row and column vectors switched around.
## How do you multiply two matrices?
By calculating the dot product between each row of matrix a with each column of matrix b. If I understand this correctly, matrix a has to be a tranposed version of matrix b regarding the length of its rows and columns. 
## Why is order important?
Because we don't end up in the same place when we change the order of transformation around, it's not like 2*3=3*2.
If we walk up five steps on (the x-axis) and turn and turn by 90 degress, we won't be in the same place as when we first turn by 90 degress and walk five steps(down the y-axis).
## Transformations1
### Operation:
Translation by 6 on the x-axis. 
### Transformation matrix:
[6 0]
## Transformations2
I'm lazy:
```
  scale(0.5);
  translate(11, 0.25); 
  shearY(PI/6);
```

### Transformation matrix:
0,5000  0,0000  5,5000
0,2887  0,5000  0,1250



