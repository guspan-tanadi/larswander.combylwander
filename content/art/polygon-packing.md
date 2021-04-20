---
title: "Polygon Packing"
date: 2021-01-12
summary: Laying many shapes edge-to-edge, and exploring the textures they create.
---

You might have heard of
[tesselations](https://en.wikipedia.org/wiki/Tessellation), and you've
definitely seen a few before. A tesselation of a flat surface simply involves
covering it in shapes, without having any overlap or leaving any gaps. For
example: the tiles on your kitchen floor are a tesselation (unless you're
missing some tiles). A <a aria-describedby="footnote-label"
href="#mosiac">mosaic</a> is a tesselation. The infinite variety produced from
a few simple shapes in a [Penrose
Tiling](https://mathworld.wolfram.com/PenroseTiles.html) are tesselations.
There are many [beautiful examples of tesselations
online](https://www.widewalls.ch/magazine/tessellation-mathematics-method-art),
and they have been used to [create art for
millenia](https://www.britannica.com/art/mosaic-art).

I was curious what would happen if we changed the requirements for making
tesselations a little, and instead used the following rules:

* No overlapping shapes (the same as a tesselation).
* Gaps can exist between shapes.
* Shapes must be layed edge-to-edge.

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

The algorithm works as follows: 

1. Place the shape we're packing at the center, e.g. (0, 0).
2. As long as we don't have "count" (e.g. 100) shapes placed, repeatedly:
    1. Look at the closest edge to the center that doesn't have a shape next to
       it yet.
    2. Try to place the shape next to that edge (allowing for reflections).
    3. If it doesn't collide with any shape we've placed yet, place it.
    4. Go back to 2.1

You can think of it as trying to place shapes as close to the center, as long
as they aren't overlapping, and they are touching edge-to-edge with another
shape that's already been placed.

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
      return result

    for new_shape in shape.options(edge):   # all rotations/flips around `edge`
      if not new_shape.collides(result):    # if there's not a collision
        result.add(new_shape)               # save the shape
        open_edges.push(new_shape.edges())  # save the edges for later shapes
        break

  return result
```

> __Sidenote__: There are surprising number of edge-cases when looking for 
> colliding shapes when allowing for (and encouraging) shapes to lie
> edge-to-edge. I might do an explanation of these in a later post if anyone
> expresses interest in trying to implement this themselves.

This code is rather simple, and as long as you understand what it's doing, it
shouldn't be a surprise (at least in small cases) how shapes are placed next to
one another.  The "magic" happens when you scale this up to several thousand
shapes.

## Results

> These results were all plotted with a pen-plotter.

I started by packing differently shaped triangles, on the order of a few
thousand at once. The result is immediately quite satisfying, and reminds me
visually of [grain
boundaries](https://en.wikipedia.org/wiki/Grain_boundary) found in crystalline
structures.

<figure class="art">
  <img src="/img/art/polygon-packing/triangle-zoom.jpg" alt="Packing of triangles">
  <figcaption>Here we have a zoomed in plot of a packing of triangles. Surprisingly, the triangles seem to orient themselves to point towards the center, and form large, contiguous regions where the packing pattern is repeated. </figcaption>
</figure>

<figure class="art">
  <img src="/img/art/polygon-packing/triangle-round.jpg" alt="Packing of triangles">
  <figcaption>Zoomed out, we see that the constant pressure to place shapes at
  the center results in a rounded figure. The "grain boundary" effect at this
  level is even more pronounced.</figcaption>
</figure>

Moving shapes far away from the origin, in effect forcing them to pack close
to a line rather than a single point creates even more clearly delineated grain
boundaries:

<figure class="art">
  <img src="/img/art/polygon-packing/triangle-flat.jpg" alt="Packing of triangles">
  <figcaption>Zoomed out, we see that the constant pressure to place shapes at
  the center results in a rounded figure. The "grain boundary" effect at this
  level is even more pronounced.</figcaption>
</figure>


<footer>
  <ol>
	<li id="mosaic">
	  You might argue that the space between tiles in a mosiac filled by grout
      prevents it from being a tesselation... but that's silly.
	</li>
	<li id="tetris">
	  Tetris players will (perhaps unknowingly) be very familiar with this set
      of problems.
	</li>
  </ol>
</footer>
