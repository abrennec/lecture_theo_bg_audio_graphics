![](water_drop.png)

- Played with amplitude and frequency in shader.vert to make more of a "water drop" effect. 
- Tried to get mouseX into shader.vert by:
  - myShader.setUniform (line26 of sketch.js) and,
  - uniform float mouseX (line31 of shader.vert) and,
  - adding variable to line 48 of shader.vert.

Seems like something is happening because when I click on the screen, the whole blob dissapears... maybe the value is too large / ie, its not actually mapping to a floating point and just shooting the graphic out of frame... dno. 

![](p5_varying1.png)
![](p5_varying2.png)

Uncommented line 26 of [basic.vert](lecture_theo_bg_audio_graphics/07_graphics_shader_programming/code/shaders/p5_sketches/p5_2_varying/basic.vert) in p5_2_varying. This changed the colours, but I have no idea why...

As usuall have just tried to surgically go through the code and try and understand it without watching tutorials - this time it didn't prove very fruitfull. As they say on the streets, this shader programming stuff is cray cray...