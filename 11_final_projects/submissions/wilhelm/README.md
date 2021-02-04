# Theoretical Backgrounds in Audio and Graphics
## Sebastian Wilhelm

## Audio Project

For the audio project I wanted to create something programmatically and used Sonic Pi.
Link to the full [documentation](https://github.com/seb-ctech/winds_of_kyoto).
Here I experimented with samples as instruments, with additive synthesis to emulate a real instrument and implemented traditional composition techniques as my main code architecture. 

## Graphics Project

For the graphics project I wanted to create an abstract 3D piece with a clean aesthetic.
I also wanted to cover the following topics: Vertex sorting, Procedural Mesh Drawing, Interactive Matrix Manipulation and Shader coding.
By sorting randomly generated vertices from left to right and drawing them with "TRIANGLE_STRIPS" I manaaged to create a 3D strip with hard edges. After experimenting a bit I found that if by pressing spacebar to scale the matrix on the X-Axis it resembles a squeezebox and went with that idea. 

## Bringing it together

To bring the two projects ever so little together I implemented a reactive component in the vertex shader and also made the matrix scaling react to the sound. I then used the EDM Track "Hero" from Infected Mushroom, because it has a very ominous and agressive feel similar to the piece.
While listening to it, I found some similarities in the dramaturgy between the song and my sonic pi composition. So I removed the flute from my own composition, to avoid melodic conflicts and mixed the audio tracks together in what resulted in the highly blasphemous creation "hero of kyoto". 
