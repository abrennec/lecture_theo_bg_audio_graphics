# Graphics Project
## Sebastian Wilhelm

*Note: My Graphics project was combined with my musical composition. The project is located in the submissions folder for the [final project](../../../11_final_projects/submissions/wilhelm)*

With my Graphics project I wanted to try out a more experimental and bottom-up approach and didn't start with an initial idea.
I wanted to learn and explore procedural geometry creation and shader programming. I quickly realised that the most form defining step was in how the vertices where sorted. So I generated a set of randomly positioned vertices. Just for a test I then wrote a function that sorts the vertices from left to right. The geometry turned out to look like a long folded strip that resembled lightning on one hand and a folded-up paper strip on the other. I then played around with matrix manipulations and discovered a stretching behavior that reminded me of a squeezebox. I then wrote a function that relaxes the squeezebox on release. The resulting pulsing movement, the hard and folded edges, and an aesthetic that reminded me of japanese "origami" lead to the fusion that I developed for the final project. [For more Info](../../../11_final_projects/submissions/wilhelm)

I liked the flat unlit look and wanted to emphasize it by creating an outline to highlight the silhouette edge. After a few tries I discovered that I couldn't reproduce the same "projection matrix" transformations on the external frame buffer and had as a result a two layered composition, where the main geometry functioned as mask for the second layer.