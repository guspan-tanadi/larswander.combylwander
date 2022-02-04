---
title: "Watercolor (Pen) Plots"
date: 2021-11-12
categories: plots
---

Pen plotter artwork has gained a lot of traction these past few years, with
[many](https://mattdesl.svbtle.com/pen-plotter-1),
[great](https://medium.com/quarterstudio/an-intro-to-pen-plotters-29b6bd4327ba),
[resources](https://scruss.com/blog/2016/05/17/pen-plotters-not-just-output-devices/)
published on how to get started. Personally, having been fortunate to WFH
during the pandemic, I found pen plotting to be a great distraction from the
rest of 2020. In the process, I discovered Licia He's
[work](https://www.instagram.com/blahblahpaperblah/), and [process
writeup](https://www.dirtalleydesign.com/blogs/news/how-to-watercolor-painting-with-a-robotic-drawing-machine-an-interview-with-licia-he)
using watercolor with her plotter. Immediately inspired, and wanting to try
this myself, I dove right in.

I'll share what I've learned so far below. I'm far from an expert, but the
resources online for this topic are otherwise scarce, so I hope this will help
anyone interested in trying this themselves. But first, let's look at some
results:

## Selected pieces

</body></html>

<figure class="art">
  <img src="/img/posts/watercolor-plots/flow-wiggles.webp" alt="Wiggly
  watercolor flow field">
  <figcaption>Lines along a Perlin flow fold.<br><br>One thing I
  noticed early in the watercolor exploration was that <i>many</i> attempts looked
  like a human could have painted them, and (unlike with traditional pen
  plots) it takes some extra effort to highlight that a machine was involved.
  Now, I don't want the art to look 100% robotic, but it just seems silly to go
  through all the work of programming a machine to paint when it could easily be
  replicated by hand.<br><br>This piece was an early breakthrough
  in combining the aesthetics of watercolor with the precision of a robot, and
  I really like the result.
  </figcaption>
</figure>

<figure class="art">
  <img src="/img/posts/watercolor-plots/lines-walking.webp" alt="Lines walking,
  in 4 colors">
  <figcaption>One of my favorite results so far, and the only piece I've placed
  into my <a href="https://shop.larswander.com">shop</a>.<br><br>
  The repetition is almost regular, but small irregularities surface both in the
  pattern and the way the paint is layed down.
  </figcaption>
</figure>

## The Gear

> You _[gotta get the gear](https://twitter.com/i/status/817192881983098880)_
> -- Portlandia

### Plotter

It goes without saying that you need some sort of [Pen
plotter](https://all3dp.com/2/pen-plotters-best-xy-plotters/) to get started.
However, there are a few things to consider:

  * You need enough vertical (or `Z`-axis) "pen" travel to clear the edge of
    your paint tray. Depending on the paint tray, this will be around 1cm of
    vertical travel.
  * The plot arm needs to move in both `X` & `Y` directions. Plotters that feed
    paper for varying `Y`-axis travel, with a single carriage for `X`-axis
    travel (like the [HP
    7550A](https://www.youtube.com/watch?v=qtrIAGso1n0)) won't work with the
    <a aria-describedby="footnote-label" href="#gengeomergence">methods
    described here</a>.
  * Vertical, [hanging wall-mounted
    plotters](https://homofaciens.de/technics-machines-v-plotter_en.htm) would
    take some creativity to make work.
  * The flatter and more even your plot surface, the easier your life will be.
    Any large divets or bumps will be visible as they will likely affect the
    brush-stroke pressure.

I'm a big fan of the
[Axidraw](https://shop.evilmadscientist.com/productsmenu/846); however, I've
found I've needed to buy a lot of [replacement
servos](https://shop.evilmadscientist.com/productsmenu/903) as the added
vertical pen travel distance wears them out quickly.

### Brushes

The most common question I get asked about my process is the brush that I use,
so here are my favorites:

<figure class="art">
  <img src="/img/posts/watercolor-plots/brush-heads.webp" alt="Mangled brushes">
  <figcaption>Three of my brushes, all with the bristles cut down for more
  predictable paint patterns.<br><br>
  The brushes are Princeton Select & Princeton Velvetouch flat shaders, in the
  smallest sizes available.
  </figcaption>
</figure>

You're welcome to buy those brushes, but I think it's way more fun to go out
& experiment on your own. I highly recommend a trip to your local arts & crafts
store to find what you like. Here are some of the things I've learned:

  * The bristles need to be sturdy, otherwise they spread out and produce a very
    "messy", unpredictable paint pattern. Finding the right bristles requires
    handling the brushes in person -- the first set I ordered off of Amazon
    were way too soft and flexible to be practical.
  * Chopping the top of the bristles off is a huge help in making
    the brush more predicatable.
  * For my preference, the thinner the brush the better. Larger, wider brushes
    produce strokes that are too "messy" for my taste.
  * The brushes will shed their bristles over time. I've learned to accept that
    stray bristles embedded in the plotter art are a part of the process :)
  * I've had some success with Bamboo Reed Pens, as they don't have any bristles
    to begin with, but they lay paint down too slowly to be as practical as
    proper brushes.

<figure class="art">
  <img src="/img/posts/watercolor-plots/messy-contours.webp" alt="Messy contour
  plot">
  <figcaption>This is the result of using a regular, unmodified brush.<br><br>
  This was meant to be a contour plot (and it still looks like
  one), but you can see that many of the contour lines don't close properly,
  and in some places the lines almost intersect. Maybe you like this aesthetic,
  but it's not what I'm after with a pen plotter.</figcaption>
</figure>


### Paint Tray

I started with a small, plastic paint tray fastened to my plot surface with
some painters tape, but realized that it wasn't ideal for the following
reasons:

  * The paint tray needs to be sturdy, and mounted to the paint surface with
    enough traction, to avoid spilling paint while the plotter is running. On
    the other hand, too much traction can result in a giant mess if the
    pen-lift servo dies and your plotter arm starts fighting with your paint
    tray. Getting the right balance of tape is no mean feat.
  * The paint tray should be easy to remove to clean -- repeatedly
    taping and un-taping the paint tray becomes pretty tedious as you
    experiment with colors.
  * The reservoirs should be fairly large/deep, without making the paint tray
    itself too tall (ultimately the brush needs to clear the edge of the tray).
    All the paint trays I found were either too large to fit next to my
    plotter, or too small and flimsy to hold much paint.

Having never 3D printed before, this seemed like the perfect excuse to get
started. I wound up sending my prints to [3D Hubs](https://www.hubs.com/) with
<a aria-describedby="footnote-label" href="3d-printing">great success</a> after
numerous prototypes at a local print shop.

Here is the end result (you can download these parts from [my
Thingiverse](https://www.thingiverse.com/thing:5135917) as well):

<figure class="art">
  <img src="/img/posts/watercolor-plots/paint-tray.webp" alt="Paint tray">
  <figcaption>
    The paint tray is held in place on my magnetic plot easel with 4mm diameter
    & 10mm tall cylindrical magnets. This configuration makes it easy to slot
    the paint tray into different configurations without moving the plotter
    carriage.<br><br>The lid has a little bit of clearance, but clips onto the
    paint tray over the magnets quite firmly, and helps keep the paint from
    drying out.
  </figcaption>
</figure>

> __Note__: PLA is not considered to be waterproof. However,
> [PETG is](https://www.simplify3d.com/support/materials-guide/petg/), and
> might be a better choice of material if you want to print the parts I
> have linked above.

### Paints

I've been using Windsor & Newton watercolor paint tubes and have loved the
results. The only tricky bit is transferring water to/from the paint tray,
which I do using some craft syringes.

## The Software

Now for the fun part!

Unfortunately, I don't know of any off-the-shelf solutions that can convert an
SVG or similar plot-friendly file into a format that your plotter can
watercolor with. So (for now) you'll have to write your own, or modify your
plot files by hand. Depending on your plotter, there are two ways to go about
this:

1. You could embed paths into your plot file that are located under your paint
   trays. Licia He does this, and [has an example uploaded on
   PlotterFiles](https://plotterfiles.com/profile/files/d9382a20-1044-41f6-b0e2-6aef7e81e024).
2. If you are feeding `x,y,z` coordinates to your plotter directly (i.e. via
   the [AxiDraw Python
   API](https://axidraw.com/doc/py_api/#quick-start-interactive-xy)), you can
   program heuristics to decide when & where to refill paint as the plot is
   running. This is the approach I chose.

I'll talk a little about the heuristics and results below.

### Paint Refills

<figure class="art">
  <img src="/img/posts/watercolor-plots/blue-dots.webp" alt="Randomized paint
  refills">
  <figcaption>
   Randomizing both the stroke order, and paint refill distance produced this
   really lovely texture with strokes of varying opacity.
  </figcaption>
</figure>

The first thing you'll need to do is decide when the plotter needs to grab more
paint. The easiest way to do this is to pick a distance that the plotter needs
to travel before it returns to the paint tray. You have a couple things to
consider here:

  * Everytime the brush leaves the surface of the paper, extra
    paint is left behind. For example, a 3cm line of paint drawn continuously
    will look much darker than the 3rd of three 1cm lines. You can account for
    this by penalizing the draw distance to refill everytime the brush leaves
    the paper.
  * The order of strokes is suddenly much more important than with regular pen
    plotting. The consistency of the paint will change as the plotter runs
    (some pigments will settle, some water will evaporate).
  * Drawing continuous lines with even color is tricky. Simply breaking a line
    into segments, and refilling after each segment will likely not work.
    Instead, having the segments overlap is crucial:
<br>
<blockquote class="twitter-tweet"><p lang="en" dir="ltr">
  Working on getting smooth watercolor lines
  <a href="https://twitter.com/hashtag/axidraw?src=hash&amp;ref_src=twsrc%5Etfw">#axidraw</a>
  <a href="https://twitter.com/hashtag/plottertwitter?src=hash&amp;ref_src=twsrc%5Etfw">#plottertwitter</a>
  <a href="https://t.co/0ca7CF5iJ7">pic.twitter.com/0ca7CF5iJ7</a>
  </p>
  &mdash; Lars Wander (@larswander)
  <a href="https://twitter.com/larswander/status/1396929588123553794?ref_src=twsrc%5Etfw">
  May 24, 2021</a>
</blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

### Layers and Pools

One concept I've found really helpful was to approach layering colors in 2
ways.

1. The first are "layers", or continuous runs of the plotter with a pause in
   between. With traditional pen plotting, this is what you'd do to swap out a
   pen for another in a different color, thickness, etc... This same concept
   applies here, allowing you to clean your brush, let paint dry, pick some new
   colors, etc...
2. The second are "pools", corresponding to the pools of paint in your paint
   tray. I annotate each path with a list of pools, e.g. "1,2,3" to fill the
   brush with before drawing. This allows paints to mix both on the brush, and
   on the paper.

<figure class="art">
  <img src="/img/posts/watercolor-plots/pools.webp" alt="Labeled pools">
  <figcaption>
    I've labeled the 4 pools in my paint tray in this diagram. Having the brush
    move between the pools, either for a single stroke, or between different
    strokes allows for the paint to blend & mix.
    <br><br>
    It can help to keep a dedicated pool of clear water to better control how
    much the paint mixes. I also recommend randomizing the brushes' movement
    within each pool keep the pigment properly suspended.
  </figcaption>
</figure>

---

That it's for now, looking forward to what everyone creates!

Happy plotting!

## Addendum 

<span class="post-date">2022-01-27</span>

I've since epoxy-coated all of my 3D-printed paint trays. This has had a few
benefits:

1. The epoxy doesn't seem to stain in the same way the PETG does, so there is
   less fear of cross-contamination between colors.
1. They are way easier to clean.
1. The roughness of the 3D printed surface is gone, reducing the wear on the
   bristles of my brushes.

<footer>
  <ol>
	<li id="gengeomergence">
      That said, artist <a href="https://joshua-bagley.com/">Joshua Bagley</a>,
      a.k.a.  <a href="https://instagram.com/gengeomergence">Gengeomergence</a>
      has produced some lovely watercolor-like pieces using the HP 7550A by
      feeding ink through the top of a 3D printed custom cartridge while his
      plotter was running.
    </li>
	<li id="3d-printing">
      One thing to keep in mind is the minimum order size. I had to order 4
      paint trays to meet the minumum spend requirement. To prototype, I had
      started by using a local printing company that allowed me to print in
      smaller batch sizes with a lower minumum order spend, but the print
      quality suffered.
    </li>
  </ol>
</footer>
