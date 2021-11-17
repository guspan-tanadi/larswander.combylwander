---
title: "Polygon Packing"
date: 2021-04-21
summary: Laying many shapes edge-to-edge, and exploring the textures they create.
draft: false
---

You might have heard of
[tesselations](https://en.wikipedia.org/wiki/Tessellation), and you've
definitely seen a few before. A tesselation of a flat surface simply involves
covering it in shapes, without having any overlap or leaving any gaps. For
example: the tiles on your kitchen floor are a tesselation (unless you're
missing some tiles). A <a aria-describedby="footnote-label"
href="#mosaic">mosaic</a> is a tesselation. The infinite variety produced from
a few simple shapes in a [Penrose
Tiling](https://mathworld.wolfram.com/PenroseTiles.html) are tesselations.
There are many [beautiful examples of tesselations
online](https://www.widewalls.ch/magazine/tessellation-mathematics-method-art),
and they have been used to [create art for
millenia](https://www.britannica.com/art/mosaic-art).

I was curious what would happen if we changed the requirements for making
tesselations a little, and instead used the following rules:

* No overlapping shapes (the same as a tesselation).
* Gaps can exist between shapes (different from a tesselation).
* Shapes must be layed edge-to-edge (to enforce some structure).

By allowing for gaps between shapes, this becomes a variant of [Packing
problems](https://en.wikipedia.org/wiki/Packing_problems). These problems try
to fit shapes into <a aria-describedby="footnote-label"
href="#tetris">containers</a>, allowing for some space between shapes as it may
not be possible to create a perfect fit. I wasn't so interested in finding
"optimal packings", but instead just looking for the patterns that arise when
we apply these rules.

## Packing procedure

Before looking at results, let me describe at a high-level how my polygon
packing algorithm works. You can skip this part if you're not interested, but I
think it's important to have a high-level understanding to appreciate the
results. 

The algorithm does the following: 

1. Place the `shape` we're packing at the center, e.g. (0, 0).
2. As long as we don't have `count` (e.g. 100) shapes placed, repeatedly:
    1. Look at the closest edge to the center that doesn't have a shape next to
       it yet.
    2. Find an edge on our `shape` with the same length, and place our shape
       against it (reflecting it if need-be).
    3. If it doesn't collide with any other shapes in out packing, save it.

You can think of it as trying to place shapes as close to the center without
overlapping, but only when sitting edge-to-edge with another shape that's
already been placed.

To demonstrate what's going, I've drawn the first few iterations of this
algorithm against a triangle:

<figure class="wide">
  <img src="/img/art/polygon-packing/procedure.webp" alt="Packing procedure">
  <figcaption>The center is denoted with <code>0,0</code>. The edge we pick to line up our
  shape against is given a red tick mark. After just a few iterations the
  result is quite predictable, and a little boring. It gets more interesting as
  we start to pack more shapes (see below).</figcaption> 
</figure>

### Pseudocode 

If you're interested, here is some (unoptomized) python-esque pseudocode. This
part is definitely skippable.

```
# `shape` the shape we will pack, located at the origin
# `count` is how many shapes we want to pack
def polygon_packing(shape, count):
  result = [shape.copy()]             # place a shape at the center
  open_edges = queue(shape.edges())   # all edges, sorted by distance to (0, 0)

  while len(result) < count:            # keep going until we have `count` shapes
    edge = open_edges.pop()             # look at the closest edge to (0, 0)

    if edge is None:                    # if no edges remain, we're done early
      print("ran out of edges early...")
      return result

    for new_shape in shape.options(edge):   # all rotations/flips around `edge`
      if not new_shape.collides(result):    # if there's not a collision
        result.add(new_shape)               # save the shape
        open_edges.push(new_shape.edges())  # save the edges for later packing
        break

  return result
```

> __Sidenote__: There are a surprising number of edge-cases when looking for 
> colliding shapes when allowing for (and encouraging) shapes to lie
> edge-to-edge. I might do an explanation of these in a later post if anyone
> expresses interest in trying to implement this themselves.

This code is rather simple, and as long as you understand what it's doing, it
shouldn't be a surprise (at least in small cases) how shapes are placed next to
one another.  The "magic" happens when you scale this up to several thousand
shapes.

## Results

These results were all plotted with a pen plotter. I'll be walking through how
different shapes wind up packing together.

### Triangles

I started by packing differently shaped triangles, on the order of a few
thousand at once. The result is immediately quite satisfying, and reminds me
visually of [grain
boundaries](https://en.wikipedia.org/wiki/Grain_boundary) found in crystalline
structures.

<figure class="art">
  <img src="/img/art/polygon-packing/triangle-zoom.webp" alt="Packing of triangles">
  <figcaption>Here we have a zoomed in plot of a packing of triangles.
  Surprisingly, the triangles seem to orient themselves to point towards the
  center, and form large, contiguous regions where the packing pattern is
  repeated.
  <br><br><b>Parameters</b>
  <br><code>shape: [0, 2], [2, 0], [0.9, 0.45]</code>
  <br><code>count: 3000</code>
  </figcaption> 
</figure>

<figure class="art">
  <img src="/img/art/polygon-packing/triangle-round.webp" alt="Packing of triangles">
  <figcaption>Zoomed out, we see that the constant pressure to place shapes at
  the center results in a rounded figure. The "grain boundary" effect at this
  level is even more pronounced.
  <br><br><b>Parameters</b>
  <br><code>shape: [0, 2], [2, 0], [0.9, 0.45]</code>
  <br><code>count: 3000</code>
  </figcaption> 
</figure>

Moving shapes far away from the origin, in effect forcing them to pack close
to a line rather than a single point creates even more clearly delineated grain
<a aria-describedby="footnote-label"
href="#pen-gradient">boundaries</a>:

<figure class="art">
  <img src="/img/art/polygon-packing/triangle-flat.webp" alt="Packing of triangles">
  <figcaption>The grain structures grow quite large here, and the contiguous
  filled spaces create a nice composition in constrast to the gaps left where
  no shapes could be packed.
  <br><br><b>Parameters</b>
  <br><code>parameters lost due to technical error</code>
  </figcaption> 
</figure>

### Watercolor

For fun, I've also used the pen plotter to <a
aria-describedby="footnote-label" href="#watercolor-gradient">create</a> a
[watercolor](/writing/watercolor-plots) of these triangle
packings:

<figure class="art">
  <img src="/img/art/polygon-packing/triangle-watercolor.webp" alt="Watercolor packing of triangles">
  <figcaption>For aesthetic reasons, I shrank every packed triangle before
  filling it. The overall effect is quite playful I think. This is one of my
  first successful watercolor experiments with the pen plotter -- the
  challenge here lay in getting the fill for each shape to look right.
  <br><br><b>Parameters</b>
  <br><code>shape: [0, 0], [1, 0], [0.5, 1]</code>
  <br><code>count: 350</code>
  <br><code>scale: 0.65</code>
  </figcaption> 
</figure>

### Quads

Foursided shapes (unsurprisingly) produce some very different results. One of
my favorite results has come from using slightly "lopsided" squares, meaning
one of the four shape is ever so slightly out of position. A packing of
regular squares using my packing procedure would just result in a tesselation,
after all.

<figure class="art">
  <img src="/img/art/polygon-packing/quad-lopsided-zoom.webp" alt="Packing of
  lopsided squares">
  <figcaption>Looking closely at this "lopsided" square packing we see much
  smaller regions of alignment among the shapes.
  <br><br><b>Parameters</b>
  <br><code>shape: [0, 0], [1, 0], [1, 0.9], [0, 1]</code>
  <br><code>count: 20000</code>
  </figcaption> 
</figure>

<figure class="art">
  <img src="/img/art/polygon-packing/quad-lopsided.webp" alt="Packing of
  lopsided squares">
  <figcaption>From a distance, we just see a very lovely texture, reminiscent
  European rounded pavers, or <a target="_blank"
  href="https://en.wikipedia.org/wiki/Sett_(paving)">setts</a>.
  <br><br><b>Parameters</b>
  <br><code>shape: [0, 0], [1, 0], [1, 0.9], [0, 1]</code>
  <br><code>count: 20000</code>
  </figcaption> 
</figure>

Trapezoids on the other hand create a much more hectic and vibrant texture.

<figure class="art">
  <img src="/img/art/polygon-packing/quad-trapezoid.webp" alt="Packing of
  trapezoids">
  <figcaption>The gaps in the
  packing seem to radiate from the center in a somewhat regular but
  unpredicatable pattern. Definitely something chaotic going on here.
  <br><br><b>Parameters</b>
  <br><code>shape: [0, 0], [1, 0], [0.7, 0.7], [0.3, 0.7]</code>
  <br><code>count: 15000</code>
  </figcaption> 
</figure>

<figure class="art">
  <img src="/img/art/polygon-packing/quad-trapezoid-zoom.webp" alt="Packing of
  trapezoids">
  <figcaption>Zooming in reveals a section where the trapezoids seem to find a
  very stable/repeated pattern starting in the center.
  <br><br><b>Parameters</b>
  <br><code>shape: [0, 0], [1, 0], [0.7, 0.7], [0.3, 0.7]</code>
  <br><code>count: 15000</code>
  </figcaption> 
</figure>

### Non-convex shapes

So far, all of the shapes we've packed have been "convex", meaning you could
wrap a string around them and have the string touch every side. So, of course,
we need to see what [non-convex, (or
concave)](https://en.wikipedia.org/wiki/Concave_polygon) polygons look like
when packed. This is an area I want to explore in more detail as it seems to
produce the largest variety in results depending on the starting shape. For
example, here I manage to pack a non-convex quad in a very dense configuration:

<figure class="art">
  <img src="/img/art/polygon-packing/non-convex-tight.webp" alt="Packing of
  trapezoids">
  <figcaption>This render really surpised me in how visible the "grain
  boundaries" were, and how they seem to subdivide the circle into at least 8
  distinct parts.
  <br><br><b>Parameters</b>
  <br><code>shape: [0, 0], [1, 0], [1.7, 0.7], [0.7, 0.1]</code>
  <br><code>count: 20000</code>
  </figcaption> 
</figure>

Modifying the shape even just a little results in a dramatically different
packing, with far larger areas unable to pack any shapes edge-to-edge:

<figure class="art">
  <img src="/img/art/polygon-packing/non-convex-loose.webp" alt="Packing of
  trapezoids">
  <figcaption>This particular shape seems to lend itself to creating large
  holes in the resulting packing.
  <br><br><b>Parameters</b>
  <br><code>shape: [0, 0], [1, 0], [1.7, 0.7], [0, 0.2]</code>
  <br><code>count: 6000</code>
  </figcaption> 
</figure>

## Closing thoughts...

This whole idea of packing shapes is still really underexplored, and I'm sure
there's plenty more beautiful and interesting examples to find. 

On a different gear: producing these packings efficiently required some fairly
<a aria-describedby="footnote-label" href="#optimized">optimized</a> code, and resulted writing some C extensions for my Python plotter
library. If folks are interested, this could be the topic of another blog post.

<footer>
  <ol>
	<li id="mosaic">
	  You might argue that the space between tiles in a mosaic filled by grout
      prevents it from being a tesselation... perhaps, but that's not the point
      of this post. 
	</li>
	<li id="tetris">
	  Tetris players will (perhaps unknowingly) be very familiar with this set
      of problems.
	</li>
	<li id="pen-gradient">
      The intensity gradient from dark to light comes from the pen depositing more
      ink at the start of its path. Not intentional, but pretty.
	</li>
	<li id="watercolor-gradient">
      The intensity gradient from dark to light comes was intentional this
      case, and came from progressively diluting the watercolor source as the
      plot progressed. 
	</li>
	<li id="optimized">
      Early attempts at packing using pure Python wound up taken 10+ minutes to
      produce a packing of several thousand shapes. This is a real bummer for
      iterating.
	</li>
  </ol>
</footer>
