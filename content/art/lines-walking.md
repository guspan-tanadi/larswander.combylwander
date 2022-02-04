---
title: Lines, Walking
date: 2022-01-09
summary: First long-form plotter series. Released on Plottables.
thumbnails: [/img/art/lines-walking/high-res/localhost-1-plot-1.jpg]
draft: false
---

"Lines, Walking" is a
"[long-form](https://tylerxhobbs.com/essays/2021/the-rise-of-long-form-generative-art)"
generative series of 99 pieces made for the pen-plotter. The project was
published on [plottables](https://plottables.io/project/4) on February 9th.

Each edition of 99 is generated from a single piece of computer code, and
tokenized for ownership. Each edition will be plotted <a
aria-describedby="footnote-label" href="#at-most-once"><i>at most once</i>
</a>. It's up to the owners of the tokens to decide how to transfer ownership
of the physical pieces (but I encourage them to keep the physical & digital
copies together).

Each token's plot will be sent to its owner for _only the cost of
shipping_. Each plot will be made available on a date depending on
it's edition number. A detailed schedule can be found [at the bottom of this
page](#schedule).

<figure class="wide">
  <img src="/img/art/lines-walking/high-res/localhost-1-plot-1.jpg">
</figure>

## What's Being Drawn

One thing I love about generative art is its ability to draw attention to the
beautiful complexity that can emerge from the right set of simple rules. The
fact that this emergent complexity exists is no longer a surprise these days.
However, _where_ this complexity exists, and _how_ it is expressed can be
wonderful to discover.

The core idea behind "Lines, Walking" is as follows: Lines advance on a
hexagonal grid, traveling from one neighboring cell to the next. If they reach
a cell on the grid that's already occupied, they change direction using a
programmed rule to find their next cell. If all of their options are exhausted,
or they've traveled a predefined number of steps, they stop advancing.

To make that a little clearer, let's use some diagrams:

<figure class="explain">
<svg viewBox="0 1 100 93">
  <defs>
    <g id="hex">
      <polygon fill="none" stroke="lightgrey" stroke-width="0.3" points="5,-9 -5,-9 -10,0 -5,9 5,9 10,0" />
    </g>
    <marker id="arrowhead-1" markerWidth="4" markerHeight="4" refX="2" refY="2" orient="auto">
      <polygon fill="#00897b" points="0 0, 4 2, 0 4" />
    </marker>
  </defs>

  <g class="hex-wrap">
    <use xlink:href="#hex" transform="translate(35, 14)"/>
    <use xlink:href="#hex" transform="translate(65, 14)"/>
    <use xlink:href="#hex" transform="translate(20, 23)"/>
    <!---<use xlink:href="#hex" transform="translate(80, 23)"/>-->
    <use xlink:href="#hex" transform="translate(50, 23)"/>
    <use xlink:href="#hex" transform="translate(35, 32)"/>
    <use xlink:href="#hex" transform="translate(65, 32)"/>
    <use xlink:href="#hex" transform="translate(20, 41)"/>
    <!---<use xlink:href="#hex" transform="translate(80, 41)"/>-->
    <use xlink:href="#hex" transform="translate(50, 41)"/>
    <use xlink:href="#hex" transform="translate(35, 50)"/>
    <use xlink:href="#hex" transform="translate(65, 50)"/>
    <use xlink:href="#hex" transform="translate(20, 59)"/>
    <use xlink:href="#hex" transform="translate(50, 59)"/>
    <!---<use xlink:href="#hex" transform="translate(80, 59)"/>-->
    <use xlink:href="#hex" transform="translate(35, 68)"/>
    <use xlink:href="#hex" transform="translate(65, 68)"/>
    <use xlink:href="#hex" transform="translate(50, 77)"/>
    <use xlink:href="#hex" transform="translate(20, 77)"/>
    <!---<use xlink:href="#hex" transform="translate(80, 77)"/>-->
  </g>
  <circle cx="35" cy="50" r="0.9" fill="#00897b"/>
  <line x1="35" y1="50" x2="37" y2="48.5" marker-end="url(#arrowhead-1)" stroke="#00897b" stroke-width="0.8"/>
</svg>
<figcaption>
Here is a 4x4 grid of hexagonal cells. Each cell is adjacent to 6 others in the
grid. The cells on the
top, left, right, and bottom boundaries of the grid "wrap" around and are
adjacent with the cells on the opposite side.<br><br>
There is a arrow pointing in the direction of our first line in <span
style="color:#00897b">green</span>, and a circle denoting the stexplaining
point. Let's advance it
a few steps to see where it ends up.
</figcaption>
</figure>

<figure class="explain">
<svg viewBox="0 1 100 93">
  <defs>
    <g id="hex">
      <polygon fill="none" stroke="lightgrey" stroke-width="0.3" points="5,-9 -5,-9 -10,0 -5,9 5,9 10,0" />
    </g>
    <marker id="arrowhead-1" markerWidth="4" markerHeight="4" refX="2" refY="2" orient="auto">
      <polygon fill="#00897b" points="0 0, 4 2, 0 4" />
    </marker>
  </defs>

  <g class="hex-wrap">
    <use xlink:href="#hex" transform="translate(35, 14)"/>
    <use xlink:href="#hex" transform="translate(65, 14)"/>
    <use xlink:href="#hex" transform="translate(20, 23)"/>
    <!---<use xlink:href="#hex" transform="translate(80, 23)"/>-->
    <use xlink:href="#hex" transform="translate(50, 23)"/>
    <use xlink:href="#hex" transform="translate(35, 32)"/>
    <use xlink:href="#hex" transform="translate(65, 32)"/>
    <use xlink:href="#hex" transform="translate(20, 41)"/>
    <!---<use xlink:href="#hex" transform="translate(80, 41)"/>-->
    <use xlink:href="#hex" transform="translate(50, 41)"/>
    <use xlink:href="#hex" transform="translate(35, 50)"/>
    <use xlink:href="#hex" transform="translate(65, 50)"/>
    <use xlink:href="#hex" transform="translate(20, 59)"/>
    <use xlink:href="#hex" transform="translate(50, 59)"/>
    <!---<use xlink:href="#hex" transform="translate(80, 59)"/>-->
    <use xlink:href="#hex" transform="translate(35, 68)"/>
    <use xlink:href="#hex" transform="translate(65, 68)"/>
    <use xlink:href="#hex" transform="translate(50, 77)"/>
    <use xlink:href="#hex" transform="translate(20, 77)"/>
    <!---<use xlink:href="#hex" transform="translate(80, 77)"/>-->
  </g>
  <circle cx="35" cy="50" r="0.9" fill="#00897b"/>
  <line x1="35" y1="50" x2="50" y2="41" marker-end="url(#arrowhead-1)" stroke="#00897b" stroke-width="0.8"/>
</svg>
<figcaption>
After 1 step the line has traveled to its immediate neighbor. The
<b><code>Rule</code></b> feature controls how a line changes direction from one
step to the next. For this example, the <span
style="color:#00897b">green</span> line is following <b><code>Rule:
A</code></b>, meaning it it will continue in the same direction until it
reaches an obstacle. <b><code>Rule</code></b> and other features are explained
more <a href="#features">below</a>
</figcaption>
</figure>

<figure class="explain">
<svg viewBox="0 1 100 93">
  <defs>
    <g id="hex">
      <polygon fill="none" stroke="lightgrey" stroke-width="0.3" points="5,-9 -5,-9 -10,0 -5,9 5,9 10,0" />
    </g>
    <marker id="arrowhead-1" markerWidth="4" markerHeight="4" refX="2" refY="2" orient="auto">
      <polygon fill="#00897b" points="0 0, 4 2, 0 4" />
    </marker>
  </defs>

  <g class="hex-wrap">
    <use xlink:href="#hex" transform="translate(35, 14)"/>
    <use xlink:href="#hex" transform="translate(65, 14)"/>
    <use xlink:href="#hex" transform="translate(20, 23)"/>
    <!---<use xlink:href="#hex" transform="translate(80, 23)"/>-->
    <use xlink:href="#hex" transform="translate(50, 23)"/>
    <use xlink:href="#hex" transform="translate(35, 32)"/>
    <use xlink:href="#hex" transform="translate(65, 32)"/>
    <use xlink:href="#hex" transform="translate(20, 41)"/>
    <!---<use xlink:href="#hex" transform="translate(80, 41)"/>-->
    <use xlink:href="#hex" transform="translate(50, 41)"/>
    <use xlink:href="#hex" transform="translate(35, 50)"/>
    <use xlink:href="#hex" transform="translate(65, 50)"/>
    <use xlink:href="#hex" transform="translate(20, 59)"/>
    <use xlink:href="#hex" transform="translate(50, 59)"/>
    <!---<use xlink:href="#hex" transform="translate(80, 59)"/>-->
    <use xlink:href="#hex" transform="translate(35, 68)"/>
    <use xlink:href="#hex" transform="translate(65, 68)"/>
    <use xlink:href="#hex" transform="translate(50, 77)"/>
    <use xlink:href="#hex" transform="translate(20, 77)"/>
    <!---<use xlink:href="#hex" transform="translate(80, 77)"/>-->
  </g>
  <circle cx="35" cy="50" r="0.9" fill="#00897b"/>
  <line x1="35" y1="50" x2="65" y2="32" marker-end="url(#arrowhead-1)" stroke="#00897b" stroke-width="0.8"/>
</svg>
<figcaption>
After 2 steps, the line arrives at the edge of the grid. Instead of treating
the edge as a boundary, we "wrap" around to the corresponding cell on the
opposite side.
</figcaption>
</figure>

<figure class="explain">
<svg viewBox="0 1 100 93">
  <defs>
    <g id="hex">
      <polygon fill="none" stroke="lightgrey" stroke-width="0.3" points="5,-9 -5,-9 -10,0 -5,9 5,9 10,0" />
    </g>
    <marker id="arrowhead-1" markerWidth="4" markerHeight="4" refX="2" refY="2" orient="auto">
      <polygon fill="#00897b" points="0 0, 4 2, 0 4" />
    </marker>
  </defs>

  <g class="hex-wrap">
    <use xlink:href="#hex" transform="translate(35, 14)"/>
    <use xlink:href="#hex" transform="translate(65, 14)"/>
    <use xlink:href="#hex" transform="translate(20, 23)"/>
    <!---<use xlink:href="#hex" transform="translate(80, 23)"/>-->
    <use xlink:href="#hex" transform="translate(50, 23)"/>
    <use xlink:href="#hex" transform="translate(35, 32)"/>
    <use xlink:href="#hex" transform="translate(65, 32)"/>
    <use xlink:href="#hex" transform="translate(20, 41)"/>
    <!---<use xlink:href="#hex" transform="translate(80, 41)"/>-->
    <use xlink:href="#hex" transform="translate(50, 41)"/>
    <use xlink:href="#hex" transform="translate(35, 50)"/>
    <use xlink:href="#hex" transform="translate(65, 50)"/>
    <use xlink:href="#hex" transform="translate(20, 59)"/>
    <use xlink:href="#hex" transform="translate(50, 59)"/>
    <!---<use xlink:href="#hex" transform="translate(80, 59)"/>-->
    <use xlink:href="#hex" transform="translate(35, 68)"/>
    <use xlink:href="#hex" transform="translate(65, 68)"/>
    <use xlink:href="#hex" transform="translate(50, 77)"/>
    <use xlink:href="#hex" transform="translate(20, 77)"/>
    <!---<use xlink:href="#hex" transform="translate(80, 77)"/>-->
  </g>
  <circle cx="35" cy="50" r="0.9" fill="#00897b"/>
  <line x1="35" y1="50" x2="72.3" y2="27.5" stroke="#00897b" stroke-width="0.8"/>
  <line x1="12.3" y1="27.5" x2="20" y2="23" marker-end="url(#arrowhead-1") stroke="#00897b" stroke-width="0.8"/>
</svg>
<figcaption>
The line has wrapped around to the left-hand side of the grid and continues
in the same direction. To make things more interesting, let's see what happens
when multiple lines advance on the same grid.
</figcaption>
</figure>

The majority of the diversity in output from this program stems from the
choice of stexplaining coordinates and directions. Let's see what happens when we
stexplain with just 2 lines.

<figure class="explain">
<svg viewBox="0 1 100 93">
  <defs>
    <g id="hex">
      <polygon fill="none" stroke="lightgrey" stroke-width="0.3" points="5,-9 -5,-9 -10,0 -5,9 5,9 10,0" />
    </g>
    <marker id="arrowhead-1" markerWidth="4" markerHeight="4" refX="2" refY="2" orient="auto">
      <polygon fill="#00897b" points="0 0, 4 2, 0 4" />
    </marker>
    <marker id="arrowhead-2" markerWidth="4" markerHeight="4" refX="2" refY="2" orient="auto">
      <polygon fill="#f8bbd0" points="0 0, 4 2, 0 4" />
    </marker>
  </defs>

  <g class="hex-wrap">
    <use xlink:href="#hex" transform="translate(35, 14)"/>
    <use xlink:href="#hex" transform="translate(65, 14)"/>
    <use xlink:href="#hex" transform="translate(20, 23)"/>
    <!---<use xlink:href="#hex" transform="translate(80, 23)"/>-->
    <use xlink:href="#hex" transform="translate(50, 23)"/>
    <use xlink:href="#hex" transform="translate(35, 32)"/>
    <use xlink:href="#hex" transform="translate(65, 32)"/>
    <use xlink:href="#hex" transform="translate(20, 41)"/>
    <!---<use xlink:href="#hex" transform="translate(80, 41)"/>-->
    <use xlink:href="#hex" transform="translate(50, 41)"/>
    <use xlink:href="#hex" transform="translate(35, 50)"/>
    <use xlink:href="#hex" transform="translate(65, 50)"/>
    <use xlink:href="#hex" transform="translate(20, 59)"/>
    <use xlink:href="#hex" transform="translate(50, 59)"/>
    <!---<use xlink:href="#hex" transform="translate(80, 59)"/>-->
    <use xlink:href="#hex" transform="translate(35, 68)"/>
    <use xlink:href="#hex" transform="translate(65, 68)"/>
    <use xlink:href="#hex" transform="translate(50, 77)"/>
    <use xlink:href="#hex" transform="translate(20, 77)"/>
    <!---<use xlink:href="#hex" transform="translate(80, 77)"/>-->
  </g>
  <circle cx="35" cy="50" r="0.9" fill="#00897b"/>
  <circle cx="65" cy="32" r="0.9" fill="#f8bbd0"/>
  <line x1="35" y1="50" x2="37" y2="48.5" marker-end="url(#arrowhead-1)" stroke="#00897b" stroke-width="0.8"/>
  <line x1="65" y1="32" x2="63" y2="30.5" marker-end="url(#arrowhead-2)" stroke="#f8bbd0" stroke-width="0.8"/>
</svg>
<figcaption>
Using the same 4x4 hexagonal grid, let's add a second line in <span
style="color:#f06292">pink</span> in the path of our existing <span
style="color:#00897b">green</span> line. If both lines just go straight,
there will be a collision.<br><br>
The <b><code>Rule</code></b> feature controls how lines
respond to occupied cells. The <b><code>Rule: A</code></b> trait
requires a line to advance in one direction until the next cell in front of it
is occupied. At that point, the line "turns left" until it either finds an
unoccupied neighboring cell, or it is finished advancing. <br><br>
Let's see what happens using these rules.
</figcaption>
</figure>

<figure class="explain">
<svg viewBox="0 1 100 93">
  <defs>
    <g id="hex">
      <polygon fill="none" stroke="lightgrey" stroke-width="0.3" points="5,-9 -5,-9 -10,0 -5,9 5,9 10,0" />
    </g>
    <marker id="arrowhead-1" markerWidth="4" markerHeight="4" refX="2" refY="2" orient="auto">
      <polygon fill="#00897b" points="0 0, 4 2, 0 4" />
    </marker>
    <marker id="arrowhead-2" markerWidth="4" markerHeight="4" refX="2" refY="2" orient="auto">
      <polygon fill="#f8bbd0" points="0 0, 4 2, 0 4" />
    </marker>
  </defs>

  <g class="hex-wrap">
    <use xlink:href="#hex" transform="translate(35, 14)"/>
    <use xlink:href="#hex" transform="translate(65, 14)"/>
    <use xlink:href="#hex" transform="translate(20, 23)"/>
    <!---<use xlink:href="#hex" transform="translate(80, 23)"/>-->
    <use xlink:href="#hex" transform="translate(50, 23)"/>
    <use xlink:href="#hex" transform="translate(35, 32)"/>
    <use xlink:href="#hex" transform="translate(65, 32)"/>
    <use xlink:href="#hex" transform="translate(20, 41)"/>
    <!---<use xlink:href="#hex" transform="translate(80, 41)"/>-->
    <use xlink:href="#hex" transform="translate(50, 41)"/>
    <use xlink:href="#hex" transform="translate(35, 50)"/>
    <use xlink:href="#hex" transform="translate(65, 50)"/>
    <use xlink:href="#hex" transform="translate(20, 59)"/>
    <use xlink:href="#hex" transform="translate(50, 59)"/>
    <!---<use xlink:href="#hex" transform="translate(80, 59)"/>-->
    <use xlink:href="#hex" transform="translate(35, 68)"/>
    <use xlink:href="#hex" transform="translate(65, 68)"/>
    <use xlink:href="#hex" transform="translate(50, 77)"/>
    <use xlink:href="#hex" transform="translate(20, 77)"/>
    <!---<use xlink:href="#hex" transform="translate(80, 77)"/>-->
  </g>
  <circle cx="35" cy="50" r="0.9" fill="#00897b"/>
  <circle cx="65" cy="32" r="0.9" fill="#f8bbd0"/>
  <line x1="35" y1="50" x2="50" y2="41" stroke="#00897b" stroke-width="0.8"/>
  <line x1="50" y1="41" x2="35" y2="32" marker-end="url(#arrowhead-1)" stroke="#00897b" stroke-width="0.8"/>
  <line x1="65" y1="32" x2="35" y2="14" marker-end="url(#arrowhead-2)" stroke="#f8bbd0" stroke-width="0.8"/>
</svg>
<figcaption>
The <span style="color:#00897b">green</span> line has turned left and
continues in its new direction. Both lines are going to wrap around the grid
before having to turn again. Let's skip ahead to see where they wind up after a
few more steps.
</figcaption>
</figure>

<figure class="explain">
<svg viewBox="0 1 100 93">
  <defs>
    <g id="hex">
      <polygon fill="none" stroke="lightgrey" stroke-width="0.3" points="5,-9 -5,-9 -10,0 -5,9 5,9 10,0" />
    </g>
    <marker id="arrowhead-1" markerWidth="4" markerHeight="4" refX="2" refY="2" orient="auto">
      <polygon fill="#00897b" points="0 0, 4 2, 0 4" />
    </marker>
    <marker id="arrowhead-2" markerWidth="4" markerHeight="4" refX="2" refY="2" orient="auto">
      <polygon fill="#f8bbd0" points="0 0, 4 2, 0 4" />
    </marker>
  </defs>

  <g class="hex-wrap">
    <use xlink:href="#hex" transform="translate(35, 14)"/>
    <use xlink:href="#hex" transform="translate(65, 14)"/>
    <use xlink:href="#hex" transform="translate(20, 23)"/>
    <!---<use xlink:href="#hex" transform="translate(80, 23)"/>-->
    <use xlink:href="#hex" transform="translate(50, 23)"/>
    <use xlink:href="#hex" transform="translate(35, 32)"/>
    <use xlink:href="#hex" transform="translate(65, 32)"/>
    <use xlink:href="#hex" transform="translate(20, 41)"/>
    <!---<use xlink:href="#hex" transform="translate(80, 41)"/>-->
    <use xlink:href="#hex" transform="translate(50, 41)"/>
    <use xlink:href="#hex" transform="translate(35, 50)"/>
    <use xlink:href="#hex" transform="translate(65, 50)"/>
    <use xlink:href="#hex" transform="translate(20, 59)"/>
    <use xlink:href="#hex" transform="translate(50, 59)"/>
    <!---<use xlink:href="#hex" transform="translate(80, 59)"/>-->
    <use xlink:href="#hex" transform="translate(35, 68)"/>
    <use xlink:href="#hex" transform="translate(65, 68)"/>
    <use xlink:href="#hex" transform="translate(50, 77)"/>
    <use xlink:href="#hex" transform="translate(20, 77)"/>
    <!---<use xlink:href="#hex" transform="translate(80, 77)"/>-->
  </g>
  <circle cx="35" cy="50" r="0.9" fill="#00897b"/>
  <circle cx="65" cy="32" r="0.9" fill="#f8bbd0"/>
  <line x1="35" y1="50" x2="50" y2="41" stroke="#00897b" stroke-width="0.8"/>
  <line x1="50" y1="41" x2="12.5" y2="18.5" stroke="#00897b" stroke-width="0.8"/>
  <line x1="72.5" y1="18.5" x2="57.5" y2="9.5" stroke="#00897b" stroke-width="0.8"/>
  <line x1="57.5" y1="81.5" x2="20" y2="59" marker-end="url(#arrowhead-1)" stroke="#00897b" stroke-width="0.8"/>
  <line x1="65" y1="32" x2="27.5" y2="9.5" stroke="#f8bbd0" stroke-width="0.8"/>
  <line x1="27.5" y1="81.5" x2="12.5" y2="72.5" stroke="#f8bbd0" stroke-width="0.8"/>
  <line x1="72.5" y1="72.5" x2="50" y2="59" stroke="#f8bbd0" stroke-width="0.8"/>
  <line x1="50" y1="59" x2="72.5" y2="45.5" stroke="#f8bbd0" stroke-width="0.8"/>
  <line x1="12.5" y1="45.5" x2="20" y2="41" marker-end="url(#arrowhead-2)" stroke="#f8bbd0" stroke-width="0.8"/>
</svg>
<figcaption>
After seven steps both lines are stuck. It just so happens that every cell was
visited in the process. To render the image in the style of "Lines, Walking",
lets remove the hexagonal grid, arrows, and apply curves to the sharp corners.
</figcaption>
</figure>

<figure class="explain">
<figcaption>
This is the completed image. Using just 16 cells and 2 lines, an
appealing pattern emerges. "Lines, Walking" uses a <a
aria-describedby="footnote-label" href="#grid-size">96x120
</a> grid of hexagons,
and 100s of lines initialized according to a regular pattern to explore
these patterns at scale.
</figcaption>
<svg viewBox="0 1 100 93">
  <path d="M35,50 Q50,41, 35,32" fill="none" stroke="#00897b" stroke-width="2" stroke-linecap="round"/>
  <line x1="35" y1="32" x2="12.5" y2="18.5" stroke="#00897b" stroke-width="2" stroke-linecap="round"/>
  <line x1="72.5" y1="18.5" x2="57.5" y2="9.5" stroke="#00897b" stroke-width="2" stroke-linecap="round"/>
  <line x1="57.5" y1="81.5" x2="20" y2="59" stroke="#00897b" stroke-width="2" stroke-linecap="round"/>
  <line x1="65" y1="32" x2="27.5" y2="9.5" stroke="#f8bbd0" stroke-width="2" stroke-linecap="round"/>
  <line x1="27.5" y1="81.5" x2="12.5" y2="72.5" stroke="#f8bbd0" stroke-width="2" stroke-linecap="round"/>
  <line x1="72.5" y1="72.5" x2="65" y2="68" stroke="#f8bbd0" stroke-width="2" stroke-linecap="round"/>
  <path d="M65,68 Q50,59, 65,50" fill="none" stroke="#f8bbd0" stroke-width="2" stroke-linecap="round"/>
  <line x1="65" y1="50" x2="72.5" y2="45.5" stroke="#f8bbd0" stroke-width="2" stroke-linecap="round"/>
  <line x1="12.5" y1="45.5" x2="20" y2="41" stroke="#f8bbd0" stroke-width="2" stroke-linecap="round"/>
</svg>
</figure>

<br>

To see how this works with hundreds of lines, I've animated the process for a
few test mints:

<figure class="wide">
<img src="/img/art/lines-walking/ani/steps1.gif"/>
</figure>

<figure class="wide">
<img src="/img/art/lines-walking/ani/steps2.gif"/>
</figure>

<figure class="wide">
<img src="/img/art/lines-walking/ani/steps3.gif"/>
</figure>

### Why Hexagons?

"Lines, Walking" started in the early Winter of 2021 on a square grid with
borders around the edges. I really liked the aesthetic of the square grid, but
quickly discovered that having the edges "wrap" around produced much more
interesting results, as it breaks up a single line into many segments that
trace one another around the page.

The square grid was wonderful for drawing abstract forms with very long lines
and pronounced curves. The plots I made with pen and a square grid are still
some of my favorites:

<figure class="wide">
  <img src="/img/art/lines-walking/high-res/original-1.jpg">
  <figcaption>
    Early "Lines, Walking" on a square grid<br><br>Spring 2021
    <a href="/img/art/lines-walking/high-res/original-1.jpg">high-res</a>
  </figcaption>
</figure>

<br>

However, I discovered that unlike on the square grid, placing the lines at
regular intervals on a hexagonal grid resulted in intricate, nestled, and
diverse patterns. The amount of variety in the images that came from only small
tweaks in the program's parameters was very exciting, and I spent many hours
looking at its different outputs. 

By the nature of the hexagonal grid, the figures drawn by the lines often look
like they are rendered isometrically. This gives many of the outputs a strange,
and slightly surreal feeling of perspective.

<figure class="wide">
  <img src="/img/art/lines-walking/high-res/original-3.jpg">
  <figcaption>
    "Lines, Walking" on a hexagonal grid<br><br>Spring 2021.
    <a href="/img/art/lines-walking/high-res/original-3.jpg">high-res</a>
  </figcaption>
</figure>

<br>

The density you can achieve by plotting with a fine-tipped pen is very
appealing to me. However, with later experimentation, I found that this
algorithm is far more interesting when visualized in watercolor. Not only does
this provide a far wider range of colors to work with, but each stroke is given
a gradient from dark to light in the direction the line's travel. I personally
love it when properties of a generative system are made visual like this.


## Plotting in Watercolor

> I've done a longer writeup on my [watercolor plotting process](/writing/watercolor-plots).
> Here I'll cover what's unique to this project.

It's important to me that the outputs of this program are all plotted, and
don't exist only as SVGs. This,
coupled with the slow paint strokes of the plotter are why the edition count is
slow "low" compared to many other long-form generative pieces.

<br>
<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Watercolor lines that
almost touch, so satisfying<a
href="https://twitter.com/hashtag/plottertwitter?src=hash&amp;ref_src=twsrc%5Etfw">#plottertwitter</a>
<a
href="https://twitter.com/hashtag/axidraw?src=hash&amp;ref_src=twsrc%5Etfw">#axidraw</a>
<a href="https://t.co/1D9luZMSRt">pic.twitter.com/1D9luZMSRt</a></p>&mdash;
Lars Wander (@larswander) <a
href="https://twitter.com/larswander/status/1471220898199912458?ref_src=twsrc%5Etfw">December
15, 2021</a></blockquote> <script async
src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
</br>

In order to help make these more easily reproducible, and
not fret with large batches of pre-mixed paint, I limited myself to using the
available [Windsor & Newton](https://www.winsornewton.com/) tube paints.
Finding color schemes that worked for this format took dozens and dozens of
test prints.

</br>
<figure class="art">
  <img src="/img/art/lines-walking/high-res/test-prints.jpg">
  <figcaption>
    A small sample of the test prints produced while iterating on the colors &
    algorithm.<br><br>
    I found that approximating colors in RGB space on a monitor was never a
    proper replacement for actually plotting them. 
  </figcaption>
</figure>

### Use of Color

Each line is colored according to its starting direction. This means there are
6 possible colors to assign. I wound up using 3 base colors, each mixed to 2
levels of opacity. Lines that start in opposite directions use the same base
color, mixed to different levels.

Coupling the starting direction and color is a very conscious choice to enforce
the repetition across the canvas, as well as highlight where the repetition
breaks down. You'll find many similar lines drawn in a single color, and easily
be able to pick out where they deviate from their pattern.

<br>
<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Very slow... But the
best way to get consistent brush strokes <a
href="https://twitter.com/hashtag/plottertwitter?src=hash&amp;ref_src=twsrc%5Etfw">#plottertwitter</a>
<a
href="https://twitter.com/hashtag/watercolor?src=hash&amp;ref_src=twsrc%5Etfw">#watercolor</a>
<a href="https://t.co/XyfM7hEOGo">pic.twitter.com/XyfM7hEOGo</a></p>&mdash;
Lars Wander (@larswander) <a
href="https://twitter.com/larswander/status/1487866417840074759?ref_src=twsrc%5Etfw">January
30, 2022</a></blockquote> <script async
src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
<br>

### DIY

> Despite offering a plot of each edition, I hope people try to plot these at
> home! This section is for those brave plotters who want to do it themselves.

There are two competing approaches to creating watercolor plots, and it stems
from the need to load your brush with paint. 

In the first approach, as long as you know where your paint wells are, you can
embed brush stroke paths into final plotter file (i.e. SVG) as the piece is
rendered. This is what Licia He does, you can see this in the PlotterFile by
Licia He in the "C" shapes were paint refills occur:

<figure class="wide">
  <img src="/img/art/lines-walking/svg/licia-he.svg">
  <figcaption>
    Made by Licia He, 
    <a href="https://plotterfiles.com/profile/files/d9382a20-1044-41f6-b0e2-6aef7e81e024">PlotterFiles</a>
  </figcaption>
</figure>

The alternative approach is to ignore the paint wells when the plot is
generated, and instead determine when and how to load the brush at plot-time.
As a result, only the paths used to draw the image are included in each "Lines,
Walking" SVG.  This is the approach I chose, mainly for the flexibility as well
as for how it fits into my current plotter workflow.

One upside to this approach is that you can just as easily plot this in pen, or
even better, in marker. I don't have any colored markers (beyond a few
sharpies), so I would love it if someone could plot one of these for themselves
in marker and share a picture.

The downside is that if you do want to plot in watercolor, you will need to
write some custom code. Here is a very high-level approach to get you started: 

1. Each layer (`<g>` tag) in the SVG has a `class` attribute corresponding to
   the [Windsor & Newton](https://www.winsornewton.com/) paint used. As
   mentioned above, each paint is mixed to a "regular", and "lighter" opacity.
   The "lighter" opacity is denoted with `-faint` in the layer's `class`
   attribute.
2. For every `<polyline>` in that layer, insert a `<circle>` with its center
   (`cx`, `cy`) on the target paint tray if and only if the the `<polyline>`
   has class `refill`. This is important, as paint is not applied to the brush
   if it corresponds to a single line that's "wrapped" around the page and has
   traveled from one edge of our hexagonal grid to the next. 

If you plot the resulting SVG as normal, the plotter will make a "circle"
in your paint tray before every line that requires a paint refill.


## Features

Each "Lines, Walking" piece is generated with 6 features.

* __`Rule`__ &nbsp; As mentioned [above](#whats-being-drawn), this feature controls how
    lines change direction each step, and what they do when they collide with
    another line. There's an endless number of rules that could be created, but
    I chose 4 for their visual properties:
    <figure class="explain">
      <figcaption>
        <b><code>A</code></b> will always continue in the same direction until
        it collides with another line. Once that happens, it will turn right
        until it finds an empty cell, and continue in that direction. Both pen
        plots (hexagonal and square) above were plotted with this rule. Its the
        simplest rule of the 4, as it keeps track of no state and turns only
        when a collision happens.
      </figcaption>
      <img src="/img/art/lines-walking/high-res/rule-a.png">
    </figure>
    <figure class="explain">
      <figcaption>
        <b><code>B</code></b> will always try to continue in the same direction it
        started in. This results in lines froming little "squiggles" as they
        weave back and forth trying to face their target direction.
      </figcaption>
      <img src="/img/art/lines-walking/high-res/rule-b.png">
    </figure>
    <figure class="explain">
      <figcaption>
        <b><code>C</code></b> is like rule <b><code>B</code></b>, in addition
        to turning right every 3 steps. 3 was chosen to form what
        look like circles when the lines don't collide and the
        <b><code>Curves</code></b> attribute is set. When they do collide,
        they produce some very organic and nestled forms.
      </figcaption>
      <img src="/img/art/lines-walking/high-res/rule-c.png">
    </figure>
    <figure class="explain">
      <figcaption>
        <b><code>D</code></b> Goes straight until it collides with another
        line. Then it turns and steps repeatedly until it collides with itself
        ending its run. This is what forms their round end-caps. I found these
        cute, as they seem to curl up and give up the moment they run into
        trouble.
      </figcaption>
      <img src="/img/art/lines-walking/high-res/rule-d.png">
    </figure>
    <br>
* __`Color`__ &nbsp; There are also 4 color schemes. How lines are assigned colors
    is explained [above](#plotting-in-watercolor).
    <figure class="explain">
      <figcaption>
        <b><code>Meadow</code></b> is drawn in Viridian, Sap Green, and
        Permanent Pink. 
      </figcaption>
      <img class="inline" src="/img/art/lines-walking/high-res/color-meadow.png">
    </figure>
    <figure class="explain">
      <figcaption>
        <b><code>Blush</code></b> is drawn in Cobalt Turquoise, Prussian Blue,
        and Permanent Pink.
        </figcaption>
      <img class="inline" src="/img/art/lines-walking/high-res/color-blush.png">
    </figure>
    <figure class="explain">
      <figcaption>
        <b><code>Contra</code></b> is drawn in Cobalt Turquoise, Gold Ochre,
        and Quinacridone Violet.
        </figcaption>
      <img class="inline" src="/img/art/lines-walking/high-res/color-contra.png">
    </figure>
    <figure class="explain">
      <figcaption>
        <b><code>Gold</code></b> is drawn in Cobalt Turquoise, Gold Ochre,
        and Permanent Pink.
        </figcaption>
      <img class="inline" src="/img/art/lines-walking/high-res/color-gold.png">
    </figure>
    <br>
* __`Steps`__ &nbsp; The value of this features controls how many steps a
    walker may take.
    <figure class="explain">
      <figcaption>
        7 steps
      </figcaption>
      <img class="inline" src="/img/art/lines-walking/high-res/steps-7.png">
    </figure>



## Who Gets a Plot?

This series was meant to be plotted and appreciated in watercolor, so every
digital token will be accompanied with a physical plot. However, it won't be
available immediately after minting. Plotting a
single piece is very time intensive; it can take hours to just to complete a
single color, and if any mistakes occur, the plot needs to be restarted from
scratch. To accomodate this, plots will be made available one-by-one on a fixed
schedule.

To claim a plot, you must be able to prove that you currently own the
accompanying token (i.e. sign a message with the ETH wallet holding the NFT).

A plot can only be claimed _once_ on or after the date it is made available
according the [schedule](#schedule) below.

Finally, you must cover the cost of shipping by providing me with a valid
shipping label, or pick up the plot in person.

### Schedule

| Edition | Date Available | Claimed |
| -- | -- | -- |
| 1  | 2022-04-01 | No |
| 2  | 2022-04-03 | No |

<footer>
  <ol>
    <li id="at-most-once">My goal is to plot each iteration exactly once. Only
    under exceptional circumstances (e.g. lost during shipping) will I consider
    replotting a piece.
    </li>
    <li id="grid-size">These numbers were picked due to the high number of
    divisors they have and share. This makes finding period patterns of lines
    much easier.
    </li>
  </ol>
</footer>
