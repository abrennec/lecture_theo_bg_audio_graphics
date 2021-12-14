# Group 1 -- Lights

## Research about shading and lighting in computer graphics.
---

### 1. What kind of lights exist for Processing and how can you use them?
   
### - ambientLight():
  
**Adds an ambient light**
    Ambient lights add an even, homogenous light source coming from all directions. Ambient light sources can provide good overall visibility, or balance out directional lighting.

##### Syntax
    ambientLight(v1, v2, v3)
    ambientLight(v1, v2, v3, x, y, z)

##### Parameters

    v1(float):          red or hue value (depending on current color mode)
    v2(float):          green or saturation value (depending on current color mode)
    v3(float):          blue or brightness value (depending on current color mode)
    x(float):           x-coordinate of the light
    y(float):           y-coordinate of the light
    z(float):           z-coordinate of the light

### - directionalLight():
  
**Adds a directional light**
“Directional light comes from one direction and is stronger when hitting a surface squarely and weaker if it hits at a gentle angle. After hitting a surface, directional lights scatter in all directions.” Directional lights can work really well as Sun lights, since the Sun’s rays are nearly parallel when they reach the Earth.

##### Syntax
    directionalLight(v1, v2, v3, nx, ny, nz)

##### Parameters
    v1 (float):         red or hue value (depending on current color mode)
    v2 (float):         green or saturation value (depending on current color mode)
    v3 (float):         blue or brightness value (depending on current color mode)
    nx (float):         direction along the x‑axis
    ny (float):         direction along the y‑axis
    nz (float):         direction along the z‑axis


### - spotLight():
  
**Adds a spot light**
Spot lights are lights that have a cone of light originating from a single point. The rays are not parallel, but emanate from a point in 3D space, similar to point lights. However, unlike point lights, spot lights do not shine in all directions.

##### Syntax
    spotLight(v1, v2, v3, x, y, z, nx, ny, nz, angle, concentration)

##### Parameters
    v1(float):              red or hue value (depending on current color mode)
    v2(float):              green or saturation value (depending on current color mode)
    v3(float):              blue or brightness value (depending on current color mode)
    x(float):               x-coordinate of the light
    y(float):               y-coordinate of the light
    z(float):               z-coordinate of the light
    nx(float):              direction along the x axis
    ny(float):              direction along the y axis
    nz(float):              direction along the z axis
    angle(float):           angle of the spotlight cone
    concentration(float):   exponent determining the center bias of the cone


### - pointLight():
  
**Adds a point light**
A point light shines in all directions from a single point in 3D space, 

##### Syntax
    pointLight(v1, v2, v3, x, y, z)

##### Parameters
    v1(float):          red or hue value (depending on current color mode)
    v2(float):          green or saturation value (depending on current color mode)
    v3(float):          blue or brightness value (depending on current color mode)
    x(float):           x-coordinate of the light
    y(float):           y-coordinate of the light
    z(float):           z-coordinate of the light


#### Other lighting parameters:
  
    noLights():         Disable all lighting
    normal():           Sets the current normal vector
    lightFalloff():     Sets the falloff rates for point lights, spot lights, and ambient lights
    lightSpecular():    Sets the specular color for lights
    lights():           Sets the default ambient light, directional light, falloff, and specular values


---
### 2. What have lights to do with shading and materials?

Lights interact with materials based on the material's properties (such as specular, roughness, color, emissivity). The incoming light rays are modified by the material properties to produce an output ray (or rays) which are sent back out into the environment. Shaders define mathematically the properties of the material.

---

### 3. Why are normal vectors important when it comes to shading?
Normal vectors play an important role in determining a material’s brightness at a particular point. “The brightness of the object at any given point of its surface depends on the angle between the normal at that point and the light direction.”
Provide one or more exemplary sketches.


### Useful links
https://www.scratchapixel.com/lessons/3d-basic-rendering/introduction-to-shading/shading-normals
http://creative-co.de/better_looking_processing/
https://processing.org/reference/
