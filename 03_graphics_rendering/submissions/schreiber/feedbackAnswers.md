Schreiber:
Nice growdrian idea, but some things are not clear to me:

    - What is redraw() actually doing in your sketch, do you need it? 

> Oh, I believe this is a remnant of an earlier version, which I have just forgotten do clean out of the code, I'm sorry about that.


    - Why do you need the for loop? 

> The for loop creates 50 new boxes every frame. These boxes all get a color randomly assigned, which is handled via the `int randomColorAssigner`.

    - What funky effect is occurring exactly _when_?

> I have left this just as a note to myself and haven't commented very well - which I will be better at from now on, sorry :-). I thought I would be presenting the code to you in person.
> The funky effect happens when line 29 is left uncommented - all boxes appear in the center of the screen in rapid sequence, which I found created a very intense and hypnotic effect.
> I have left it in as a happy accident, as it's not the look I was originally going for, and for the intended look line 29 needs to be commented out / removed.

    - Why are there more boxes when you do not use push/popMatrix?
    
> I think it's less "more boxes" than "some boxes get translated weirdly". I am assuming that when I don't push/pop the matrix the translations get accumulated somehow. I can't really say for sure though.
> I'll look into this again and I hope I can answer this question better tomorrow / understand it properly.

General questions: 

    - What is happening in the draw() function?

> Well, it's a bit of a mess and the product of a lot of iterations on the look (rather than neat code structure).
> Every frame, the background gets redrawn. Then a `pushMatrix()` marks the beginning of my random box creation. The boxes sizes' get bigger with the frameCount, so the new 3D artwork
> that gets created every frame slowly grows in size, "spreading" from the origin over the whole screen (and beyond). After every created box I call `popMatrix()` to reset everything.
> The "spreading" just a trick though, as the `translate()` in Line 29 illustrates: the boxes all get created in the same spot - as far as i can tell -
> and just their sizes increase over time.

      - What are push/popMatrix do?
      
> These are there to make sure that every newly created box will be on the right spot. Removing them makes it look weird. I still don't fully understand why adding them worked....

      - What are you trying to achieve?

> I mostly used the assignment as an exercise of working with processing. I wanted to create an intense visual, that might even hurt a little bit to look at. For the sound I am also going for a  harsh, inhuman and a little bit unpleasant feeling, which I wanted to explore here as well.
> Also I wanted to get a feeling for speed / frameRate, as I feel like getting this right has a big impact on the harmonics of the final unification of sound and visuals.


    - How would you like to continue with this? I.e., suggestions

> For my final visuals I want to work with intense visuals and 3D shapes. I would like to incorporate some "hypnotizing" elements, that make it hard for the viewers/guests to look away.
> I liked this [example](https://openprocessing.org/sketch/1246917) on the P5 website - I want the visuals to  be a bit mechanical in appearance, I was thinking of maybe using animated pipes / tubes. Last session Christian has mentioned the 80's demo scene and I really liked those "endless tunnel" animations. Here is also an example of an [interactive tunnel](https://tympanus.net/Development/InfiniteTubes/index2.html).

    - Get the basic idea right ; )

> I don't think I understand this annotation. Could you elaborate this again for me, please? :-) But yes, I still have LOT to learn when it comes to Processing....

    - What about playing with different perspectives / camera views next?

> Yes, Christian has suggested the same thing! :-) I think this is a very good idea, although I'm unsure still how I could incorporate it. I'll definitely look into it though!
