---
title: "Centering and Scaling"
date: 2022-12-27
draft: false
---

The function I'm sharing here is probably my most used piece of code when it
comes to making generative art. It shows up in practically every project I've
worked on, and originated from my plotter practice. Most of the time, I use it
to center and set margins for a piece after it's generated during rendering
(but there are many other scenarios where it's useful as well that I'll show
below).

Centering, scaling, and setting margins on 2D generative art is
something I see a lot of new generative artists struggle with, so I'm sharing
this to (hopefully) make some of your lives a little easier.

## Background

Generally speaking (and there are always exceptions) when making generative
art it's a bad idea to use a single, fixed resolution for your
output (e.g. only 1000x1000px):

  * Your art may be viewed on a range of screen shapes and sizes, and you
    probably want it to look as good as possible in these different conditions.
  * If you ever want to produce prints, you roughly want 300px/inch of
    resolution, meaning a (relatively small) 10x10" print would need at least
    3000x3000px of resolution.

A common approach is to generate all of your shapes/geometry on the unit square
(meaning all `x, y` coordinates fall in the range `[0, 1]`), and then when
rendering multiply all values by the screen resolution. This works fine if your
output resolution is still square, and your source geometry is perfectly
bounded by the unit square.

<svg width="100%" height="370px" viewbox="0 0 600 370">
  <defs>
    <marker id="arrowhead" markerWidth="4" markerHeight="4" refX="2" refY="2" orient="auto">
      <polygon fill="grey" points="0 0, 4 2, 0 4" />
    </marker>
  </defs>
  <rect x="0" y="100" width="100" height="100" fill="none" stroke="grey" stroke-width="1"/>
  <text x="100" y="220" font="16px monospace" fill="#666">(1, 1)</text>
  <g transform="translate(0 100)">
    <circle cx="50" cy="50" r="50" fill="yellow" stroke="black" stroke-width="2"/>
    <circle cx="33" cy="40" r="5" fill="black"/>
    <circle cx="67" cy="40" r="5" fill="black"/>
    <path d="M 30 65 Q 50 80 70 65" fill="none" stroke="black" stroke-width="1"/>
  </g>
  <line x1="130" y1="150" x2="220" y2="150" marker-end="url(#arrowhead)" stroke="grey" stroke-width="2" stroke-linecap"round" stroke-dasharray="6"/>
  <rect x="250" y="100" width="200" height="200" fill="none" stroke="grey" stroke-width="1"/>
  <g transform="translate(250 100) scale(2)">
    <circle cx="50" cy="50" r="50" fill="yellow" stroke="black" stroke-width="2"/>
    <circle cx="33" cy="40" r="5" fill="black"/>
    <circle cx="67" cy="40" r="5" fill="black"/>
    <path d="M 30 65 Q 50 80 70 65" fill="none" stroke="black" stroke-width="1"/>
  </g>
  <text x="450" y="320" font="16px monospace" fill="#666">(200, 200)</text>
</svg>

However, if you want to adapt your artwork to a range of screen sizes, simply
scaling the unit square by the window size doesn't work.

<svg width="100%" height="370px" viewbox="0 0 600 370">
  <defs>
    <marker id="arrowhead" markerWidth="4" markerHeight="4" refX="2" refY="2" orient="auto">
      <polygon fill="grey" points="0 0, 4 2, 0 4" />
    </marker>
  </defs>
  <rect x="0" y="100" width="100" height="100" fill="none" stroke="grey" stroke-width="1"/>
  <text x="100" y="220" font="16px monospace" fill="#666">(1, 1)</text>
  <g transform="translate(0 100)">
    <circle cx="50" cy="50" r="50" fill="yellow" stroke="black" stroke-width="2"/>
    <circle cx="33" cy="40" r="5" fill="black"/>
    <circle cx="67" cy="40" r="5" fill="black"/>
    <path d="M 30 65 Q 50 80 70 65" fill="none" stroke="black" stroke-width="1"/>
  </g>
  <line x1="130" y1="150" x2="220" y2="150" marker-end="url(#arrowhead)" stroke="grey" stroke-width="2" stroke-linecap"round" stroke-dasharray="6"/>
  <rect x="250" y="100" width="400" height="200" fill="none" stroke="grey" stroke-width="1"/>
  <g transform="translate(250 100) scale(4, 2)">
    <circle cx="50" cy="50" r="50" fill="yellow" stroke="black" stroke-width="2"/>
    <circle cx="33" cy="40" r="5" fill="black"/>
    <circle cx="67" cy="40" r="5" fill="black"/>
    <path d="M 30 80 Q 50 65 70 80" fill="none" stroke="black" stroke-width="1"/>
  </g>
  <text x="650" y="320" font="16px monospace" fill="#666">(400, 200)</text>
</svg>

I also often see generative artworks that have uneven margins, likely due to the
fact that their source geometry doesn't entirely fill the unit square before it
is projected onto the screen:

<svg width="100%" height="370px" viewbox="0 0 600 370">
  <defs>
    <marker id="arrowhead" markerWidth="4" markerHeight="4" refX="2" refY="2" orient="auto">
      <polygon fill="grey" points="0 0, 4 2, 0 4" />
    </marker>
  </defs>
  <rect x="0" y="100" width="100" height="100" fill="none" stroke="grey" stroke-width="1"/>
  <text x="100" y="220" font="16px monospace" fill="#666">(1, 1)</text>
  <g transform="translate(0 100) scale(0.85)">
    <circle cx="50" cy="50" r="50" fill="yellow" stroke="black" stroke-width="2"/>
    <circle cx="33" cy="40" r="5" fill="black"/>
    <circle cx="67" cy="40" r="5" fill="black"/>
    <path d="M 30 65 Q 50 80 70 65" fill="none" stroke="black" stroke-width="1"/>
  </g>
  <line x1="130" y1="150" x2="220" y2="150" marker-end="url(#arrowhead)" stroke="grey" stroke-width="2" stroke-linecap"round" stroke-dasharray="6"/>
  <rect x="250" y="100" width="200" height="200" fill="none" stroke="grey" stroke-width="1"/>
  <g transform="translate(250 100) scale(1.7)">
    <circle cx="50" cy="50" r="50" fill="yellow" stroke="black" stroke-width="2"/>
    <circle cx="33" cy="40" r="5" fill="black"/>
    <circle cx="67" cy="40" r="5" fill="black"/>
    <path d="M 30 80 Q 50 65 70 80" fill="none" stroke="black" stroke-width="1"/>
  </g>
  <text x="450" y="320" font="16px monospace" fill="#666">(200, 200)</text>
</svg>

And sometimes, trying to fit your work into a unit square is impossible,
because the underlying generative system is chaotic and unpredictable. The
below code and approach solves all these problems for 2D generative artwork.

## High-level idea

The below code takes two pairs of coordinates, one bounding the "source"
objects to be drawn, and another bounding the "destination" to be drawn upon.
Using these coordinates, it returns a function that maps from the source to the
destination coordinates, while preserving the ratio between `x` and `y`
dimensions (to avoid stretching the source material like we saw with the
smiley face above) by centering along the shorter axis.

The way I usually do this is something like:

1. Compute all of the shapes I want to draw (e.g. in ["how you see
   me"](/art/how-you-see-me) this is all of the vertices making up the
   paint blobs).
2. Find the source bounding box around these shapes, and calculate the
   destination bounding box using the window size and desired margin.
3. Pass these coordinates to the below `transformFn`, and use it to compute the
   new coordinates in screen space when making all the necessary draw calls.

### Bounding boxes

For historical reasons, computer screens generally treat the top-left corner as
the origin `(0, 0)` with values growing towards the bottom-right corner. I
apply this same terminology to "bounding boxes", which are the smallest
rectangles possible that entirely contain some set of shapes. Bounding boxes
are critical to this approach, as they define the area to be scaled & centered.

To illustrate this, here is the bounding box for two triangles, labeled with
its top-left and bottom-right corners.

<svg width="100%" height="450px" viewbox="0 0 800 450">
  <g transform="translate(0 70)">
    <rect x="0" y="0" width="300" height="300" fill="none" stroke="grey" stroke-width="1"/>
    <circle cx="0" cy="0" r="2" fill="#666"/>
    <text x="-5" y="-37" font="16px monospace" font-style="italic" fill="#666">top-left</text>
    <text x="-5" y="-15" font="16px monospace" fill="#666">(10, 10)</text>
    <circle cx="300" cy="300" r="2" fill="#666"/>
    <text x="300" y="320" font="16px monospace" font-style="italic" fill="#666">bottom-right</text>
    <text x="300" y="342" font="16px monospace" fill="#666">(100, 100)</text>
    <path d="M 300 270 L 140 20 120 300" fill="#f00" stroke="none"/>
    <path d="M 0 30 L 80 0 100 100" fill="#00f" stroke="none"/>
  </g>
</svg>

Finding the bounding box when you know some shapes' vertices is
simple: the top-left corner is the smallest `x` and `y` coordinates among the
vertices, and the bottom-right corner is the largest. You may need to account
for objects' stroke-width, radius, and similar here too.

## Code

I'm releasing this under the
[Apache-2.0 License](https://www.apache.org/licenses/LICENSE-2.0). It's
available for copy-paste below, or [here](/js/transform.js). If you use or modify
this, please give proper attribution :)

> Note: to avoid external dependencies (and make it easy to copy-paste into
> your project), this code represents 2D coordinates
> as 2-element lists. You're welcome to translate this to use
> [P5's Vectors](https://p5js.org/reference/#/p5.Vector) if you prefer.

> Another note: the `transformFn` code returns a function. This is done to
> avoid redundant recomputation. If this is foreign to you, check out the usage
> examples below.

<pre class="hl"><span class="hl com">/**</span>
<span class="hl com"> * Returns a function that transforms between the source and destination</span>
<span class="hl com"> * coordinate space while preserving the ratio between the input x &amp; y</span>
<span class="hl com"> * dimensions.</span>
<span class="hl com"> *</span>
<span class="hl com"> * &#64;param {[number, number]} stl Top-left point bounding the source.</span>
<span class="hl com"> * &#64;param {[number, number]} sbr Bottom-right point bounding the source.</span>
<span class="hl com"> * &#64;param {[number, number]} dtl Top-left point bounding the destination.</span>
<span class="hl com"> * &#64;param {[number, number]} dbr Bottom-right point bounding the destination.</span>
<span class="hl com"> */</span>
<span class="hl kwa">function</span> <span class="hl kwd">transformFn</span><span class="hl opt">(</span>stl<span class="hl opt">,</span> sbr<span class="hl opt">,</span> dtl<span class="hl opt">,</span> dbr<span class="hl opt">) {</span>
  <span class="hl kwa">const</span> <span class="hl opt">[</span>stlx<span class="hl opt">,</span> stly<span class="hl opt">] =</span> stl<span class="hl opt">;</span>
  <span class="hl kwa">const</span> <span class="hl opt">[</span>sbrx<span class="hl opt">,</span> sbry<span class="hl opt">] =</span> sbr<span class="hl opt">;</span>
  <span class="hl kwa">const</span> <span class="hl opt">[</span>dtlx<span class="hl opt">,</span> dtly<span class="hl opt">] =</span> dtl<span class="hl opt">;</span>
  <span class="hl kwa">const</span> <span class="hl opt">[</span>dbrx<span class="hl opt">,</span> dbry<span class="hl opt">] =</span> dbr<span class="hl opt">;</span>

  <span class="hl slc">// Compute the diagonal vector for both bounding rects.</span>
  <span class="hl kwa">const</span> <span class="hl opt">[</span>sdx<span class="hl opt">,</span> sdy<span class="hl opt">] = [</span>sbrx <span class="hl opt">-</span> stlx<span class="hl opt">,</span> sbry <span class="hl opt">-</span> stly<span class="hl opt">];</span>
  <span class="hl kwa">const</span> <span class="hl opt">[</span>ddx<span class="hl opt">,</span> ddy<span class="hl opt">] = [</span>dbrx <span class="hl opt">-</span> dtlx<span class="hl opt">,</span> dbry <span class="hl opt">-</span> dtly<span class="hl opt">];</span>

  <span class="hl slc">// Find the minimum amount to scale the user draw-area by to fill the screen.</span>
  <span class="hl kwa">const</span> <span class="hl opt">[</span>rx<span class="hl opt">,</span> ry<span class="hl opt">] = [</span>ddx <span class="hl opt">/</span> sdx<span class="hl opt">,</span> ddy <span class="hl opt">/</span> sdy<span class="hl opt">];</span>
  <span class="hl kwa">const</span> a <span class="hl opt">=</span> Math<span class="hl opt">.</span><span class="hl kwd">min</span><span class="hl opt">(</span>rx<span class="hl opt">,</span> ry<span class="hl opt">);</span>

  <span class="hl slc">// Compute the translation to the center of the new coordinates, accounting </span>
  <span class="hl slc">// for the fact that rx may not equal ry by centering the smaller dimension.</span>
  <span class="hl kwa">const</span> <span class="hl opt">[</span>ox<span class="hl opt">,</span> oy<span class="hl opt">] = [(</span>ddx <span class="hl opt">-</span> sdx <span class="hl opt">*</span> a<span class="hl opt">) *</span> <span class="hl num">0.5</span> <span class="hl opt">+</span> dtlx<span class="hl opt">, (</span>ddy <span class="hl opt">-</span> sdy <span class="hl opt">*</span> a<span class="hl opt">) *</span> <span class="hl num">0.5</span> <span class="hl opt">+</span> dtly<span class="hl opt">];</span>

  <span class="hl slc">// At this point, we transform from user to screen coordinates using</span>
  <span class="hl slc">//     (pt - tl) * a + o</span>
  <span class="hl slc">// We can skip some arithmetic in our output function by rewriting as</span>
  <span class="hl slc">//     pt * a - tl * a + o</span>
  <span class="hl slc">// ... and folding the constants into the form</span>
  <span class="hl slc">//     pt * a + b</span>
  <span class="hl kwa">const</span> <span class="hl opt">[</span>bx<span class="hl opt">,</span> by<span class="hl opt">] = [-</span>stlx <span class="hl opt">*</span> a <span class="hl opt">+</span> ox<span class="hl opt">, -</span>stly <span class="hl opt">*</span> a <span class="hl opt">+</span> oy<span class="hl opt">];</span>

  <span class="hl kwa">return</span> <span class="hl opt">(</span>inp<span class="hl opt">) =&gt; {</span>
    <span class="hl slc">// Scalar values (such as stroke-width, or radius) are only scaled by a</span>
    <span class="hl slc">// constant, not translated.</span>
    <span class="hl kwa">if</span> <span class="hl opt">(</span><span class="hl kwa">typeof</span> inp <span class="hl opt">===</span> <span class="hl str">&apos;number&apos;</span><span class="hl opt">) {</span>
      <span class="hl kwa">return</span> inp <span class="hl opt">*</span> a<span class="hl opt">;</span>
    <span class="hl opt">}</span>
    <span class="hl kwa">const</span> <span class="hl opt">[</span>x<span class="hl opt">,</span> y<span class="hl opt">] =</span> inp<span class="hl opt">;</span>
    <span class="hl kwa">return</span> <span class="hl opt">[</span>x <span class="hl opt">*</span> a <span class="hl opt">+</span> bx<span class="hl opt">,</span> y <span class="hl opt">*</span> a <span class="hl opt">+</span> by<span class="hl opt">];</span>
  <span class="hl opt">}</span>
<span class="hl opt">}</span>
</pre>

## Usage examples

### On the unit square

Say we want to draw the following scene, with coordinates normalized onto the
unit square:

<pre class="hl"><span class="hl kwa">let</span> triangleVertices <span class="hl opt">= [[</span><span class="hl num">.5</span><span class="hl opt">,</span> <span class="hl num">0</span><span class="hl opt">], [</span><span class="hl num">1</span><span class="hl opt">,</span> <span class="hl num">1</span><span class="hl opt">], [</span><span class="hl num">0</span><span class="hl opt">,</span> <span class="hl num">1</span><span class="hl opt">]];</span>
<span class="hl kwa">let</span> circleCenter <span class="hl opt">= [</span><span class="hl num">0.8</span><span class="hl opt">,</span> <span class="hl num">0.5</span><span class="hl opt">];</span>
<span class="hl kwa">let</span> circleRadius <span class="hl opt">=</span> <span class="hl num">0.15</span><span class="hl opt">;</span>

<span class="hl kwd">fill</span><span class="hl opt">([</span><span class="hl num">0</span><span class="hl opt">,</span> <span class="hl num">0</span><span class="hl opt">,</span> <span class="hl num">255</span><span class="hl opt">]);</span>
<span class="hl kwd">beginShape</span><span class="hl opt">();</span>
<span class="hl kwa">for</span> <span class="hl opt">(</span><span class="hl kwa">const</span> <span class="hl opt">[</span>x<span class="hl opt">,</span> y<span class="hl opt">]</span> <span class="hl kwa">of</span> triangleVertices<span class="hl opt">)</span> <span class="hl kwd">vertex</span><span class="hl opt">(</span>x<span class="hl opt">,</span> y<span class="hl opt">);</span>
<span class="hl kwd">closeShape</span><span class="hl opt">();</span>

<span class="hl kwd">fill</span><span class="hl opt">([</span><span class="hl num">255</span><span class="hl opt">,</span> <span class="hl num">0</span><span class="hl opt">,</span> <span class="hl num">0</span><span class="hl opt">]);</span>
<span class="hl kwd">circle</span><span class="hl opt">(...</span>circleCenter<span class="hl opt">,</span> circleRadius <span class="hl opt">*</span> <span class="hl num">2</span><span class="hl opt">);</span>
</pre>

<svg width="100%" height="280px" viewbox="-1 -20 800 260">
  <rect x="0" y="0" width="200" height="200" fill="none" stroke="grey" stroke-width="1"/>
  <circle cx="200" cy="200" r="2" fill="#666"/>
  <text x="200" y="220" font="16px monospace" fill="#666">(1, 1)</text>
  <g transform="scale(2)">
    <path d="M 50 0 L 100 100 L 0 100" fill="#00f" stroke="none"/>
    <circle cx="80" cy="50" r="15" fill="#f00" stroke="none"/>
  </g>
</svg>

Perhaps we want to draw that scene on a 6000x3000px window. The bounding box
for our source objects is defined by `[0, 0]` and `[1, 1]` (as these objects
fill the unit square), and the bounding destination coordinates are `[0, 0]`
and `[6000, 3000]` (to fill the window).

<pre class="hl"><span class="hl kwa">const</span> transform <span class="hl opt">=</span> <span class="hl kwd">transformFn</span><span class="hl opt">([</span><span class="hl num">0</span><span class="hl opt">,</span> <span class="hl num">0</span><span class="hl opt">], [</span><span class="hl num">1</span><span class="hl opt">,</span> <span class="hl num">1</span><span class="hl opt">], [</span><span class="hl num">0</span><span class="hl opt">,</span> <span class="hl num">0</span><span class="hl opt">], [</span><span class="hl num">6000</span><span class="hl opt">,</span> <span class="hl num">3000</span><span class="hl opt">]);</span>
triangleVertices <span class="hl opt">=</span> triangleVertices<span class="hl opt">.</span><span class="hl kwd">map</span><span class="hl opt">(</span>transform<span class="hl opt">);</span>
circleCenter <span class="hl opt">=</span> <span class="hl kwd">transform</span><span class="hl opt">(</span>circleCenter<span class="hl opt">);</span>
circleRadius <span class="hl opt">=</span> <span class="hl kwd">transform</span><span class="hl opt">(</span>circleRadius<span class="hl opt">);</span>

<span class="hl slc">// rest of draw code...</span>
</pre>

> Notice that we call `transform` on coordinates (like the vertices and the
> circle center), as well as on scalar values (like the circle diameter). It's
> important to `transform` all values that you want to draw.

<svg width="100%" height="370px" viewbox="0 -20 800 350">
  <rect x="0" y="0" width="600" height="300" fill="none" stroke="grey" stroke-width="1"/>
  <g transform="translate(150, 0) scale(3)">
    <path d="M 50 0 L 100 100 L 0 100" fill="#00f" stroke="none"/>
    <circle cx="80" cy="50" r="15" fill="#f00" stroke="none"/>
  </g>
  <text x="555" y="320" font="16px monospace" fill="#666">(6000, 3000)</text>
  <circle cx="600" cy="300" r="2" fill="#666"/>
</svg>

---

Now say we want to add a 500px margin around our scene. To do this, we
shrink our destination draw area by 500px, giving us bounding coordinates of
`[500, 500]`, and `[5500, 2500]`.

<pre class="hl"><span class="hl kwa">const</span> transform <span class="hl opt">=</span> <span class="hl kwd">transformFn</span><span class="hl opt">([</span><span class="hl num">0</span><span class="hl opt">,</span> <span class="hl num">0</span><span class="hl opt">], [</span><span class="hl num">1</span><span class="hl opt">,</span> <span class="hl num">1</span><span class="hl opt">], [</span><span class="hl num">500</span><span class="hl opt">,</span> <span class="hl num">500</span><span class="hl opt">], [</span><span class="hl num">5500</span><span class="hl opt">,</span> <span class="hl num">2500</span><span class="hl opt">]);</span>
triangleVertices <span class="hl opt">=</span> triangleVertices<span class="hl opt">.</span><span class="hl kwd">map</span><span class="hl opt">(</span>transform<span class="hl opt">);</span>
circleCenter <span class="hl opt">=</span> <span class="hl kwd">transform</span><span class="hl opt">(</span>circleCenter<span class="hl opt">);</span>
circleRadius <span class="hl opt">=</span> <span class="hl kwd">transform</span><span class="hl opt">(</span>circleRadius<span class="hl opt">);</span>

<span class="hl slc">// rest of draw code...</span>
</pre>

> I've drawn the destination coordinates with a dashed line to better show
> how the margins are being set.

<svg width="100%" height="370px" viewbox="0 -20 800 350">
  <rect x="0" y="0" width="600" height="300" fill="none" stroke="grey" stroke-width="1"/>
  <rect x="50" y="50" width="500" height="200" fill="none" stroke="#aaa" stroke-width="1" stroke-dasharray="6"/>
  <g transform="translate(200, 50) scale(2)">
    <path d="M 50 0 L 100 100 L 0 100" fill="#00f" stroke="none"/>
    <circle cx="80" cy="50" r="15" fill="#f00" stroke="none"/>
  </g>
  <text x="15" y="38" font="16px monospace" fill="#666">(500, 500)</text>
  <circle cx="50" cy="50" r="2" fill="#666"/>
  <text x="505" y="275" font="16px monospace" fill="#666">(5500, 2500)</text>
  <circle cx="550" cy="250" r="2" fill="#666"/>
  <text x="555" y="320" font="16px monospace" fill="#666">(6000, 3000)</text>
  <circle cx="600" cy="300" r="2" fill="#666"/>
</svg>

### Non-unit square

Now say our generative program is chaotic and unpredictable -- if we confine
the source coordinates to `[0, 0]` and `[1, 1]` we may not neatly capture what
we want to draw. In these cases, we need to compute the bounding box for our
source shapes.

Say we create a scene like this:

<pre class="hl"><span class="hl kwa">let</span> triangle1Vertices <span class="hl opt">=</span> <span class="hl kwd">Array</span><span class="hl opt">(</span><span class="hl num">3</span><span class="hl opt">).</span><span class="hl kwd">fill</span><span class="hl opt">(</span><span class="hl kwa">null</span><span class="hl opt">).</span><span class="hl kwd">map</span><span class="hl opt">(</span>_ <span class="hl opt">=&gt; [</span><span class="hl kwd">random</span><span class="hl opt">(),</span> <span class="hl kwd">random</span><span class="hl opt">()]);</span>
<span class="hl kwa">let</span> triangle2Vertices <span class="hl opt">=</span> <span class="hl kwd">Array</span><span class="hl opt">(</span><span class="hl num">3</span><span class="hl opt">).</span><span class="hl kwd">fill</span><span class="hl opt">(</span><span class="hl kwa">null</span><span class="hl opt">).</span><span class="hl kwd">map</span><span class="hl opt">(</span>_ <span class="hl opt">=&gt; [</span><span class="hl kwd">random</span><span class="hl opt">(),</span> <span class="hl kwd">random</span><span class="hl opt">()]);</span>

<span class="hl kwd">fill</span><span class="hl opt">([</span><span class="hl num">0</span><span class="hl opt">,</span> <span class="hl num">0</span><span class="hl opt">,</span> <span class="hl num">255</span><span class="hl opt">]);</span>
<span class="hl kwd">beginShape</span><span class="hl opt">();</span>
<span class="hl kwa">for</span> <span class="hl opt">(</span><span class="hl kwa">const</span> <span class="hl opt">[</span>x<span class="hl opt">,</span> y<span class="hl opt">]</span> <span class="hl kwa">of</span> triangle1Vertices<span class="hl opt">)</span> <span class="hl kwd">vertex</span><span class="hl opt">(</span>x<span class="hl opt">,</span> y<span class="hl opt">);</span>
<span class="hl kwd">closeShape</span><span class="hl opt">();</span>

<span class="hl kwd">fill</span><span class="hl opt">([</span><span class="hl num">255</span><span class="hl opt">,</span> <span class="hl num">0</span><span class="hl opt">,</span> <span class="hl num">0</span><span class="hl opt">]);</span>
<span class="hl kwd">beginShape</span><span class="hl opt">();</span>
<span class="hl kwa">for</span> <span class="hl opt">(</span><span class="hl kwa">const</span> <span class="hl opt">[</span>x<span class="hl opt">,</span> y<span class="hl opt">]</span> <span class="hl kwa">of</span> triangle2Vertices<span class="hl opt">)</span> <span class="hl kwd">vertex</span><span class="hl opt">(</span>x<span class="hl opt">,</span> y<span class="hl opt">);</span>
<span class="hl kwd">closeShape</span><span class="hl opt">();</span>
</pre>

<svg width="100%" height="370px" viewbox="0 -20 800 350">
  <rect x="0" y="0" width="300" height="300" fill="none" stroke="grey" stroke-width="1"/>
  <circle cx="300" cy="300" r="2" fill="#666"/>
  <text x="300" y="320" font="16px monospace" fill="#666">(1, 1)</text>
  <g transform="scale(3)">
    <path d="M 3 21 L 31 40 L 42 30 " fill="#00f" stroke="none"/>
    <path d="M 53 25 L 87 9 86 2" fill="#f00" stroke="none"/>
  </g>
</svg>

Before we go to call our `transformFn`, we need to compute the bounds for our
source scene. This could look something like this:

<pre class="hl"><span class="hl slc">// Returns the &quot;top-left-most&quot; point of a pair of points.</span>
<span class="hl kwa">const</span> tl <span class="hl opt">= (</span>a<span class="hl opt">,</span> b<span class="hl opt">) =&gt; [</span>Math<span class="hl opt">.</span><span class="hl kwd">min</span><span class="hl opt">(</span>a<span class="hl opt">[</span><span class="hl num">0</span><span class="hl opt">],</span> b<span class="hl opt">[</span><span class="hl num">0</span><span class="hl opt">]),</span> Math<span class="hl opt">.</span><span class="hl kwd">min</span><span class="hl opt">(</span>a<span class="hl opt">[</span><span class="hl num">1</span><span class="hl opt">],</span> b<span class="hl opt">[</span><span class="hl num">1</span><span class="hl opt">])];</span>
<span class="hl slc">// Returns the &quot;bottom-right-most&quot; point of a pair of points.</span>
<span class="hl kwa">const</span> br <span class="hl opt">= (</span>a<span class="hl opt">,</span> b<span class="hl opt">) =&gt; [</span>Math<span class="hl opt">.</span><span class="hl kwd">max</span><span class="hl opt">(</span>a<span class="hl opt">[</span><span class="hl num">0</span><span class="hl opt">],</span> b<span class="hl opt">[</span><span class="hl num">0</span><span class="hl opt">]),</span> Math<span class="hl opt">.</span><span class="hl kwd">max</span><span class="hl opt">(</span>a<span class="hl opt">[</span><span class="hl num">1</span><span class="hl opt">],</span> b<span class="hl opt">[</span><span class="hl num">1</span><span class="hl opt">])];</span>

<span class="hl kwa">const</span> allVertices <span class="hl opt">= [</span>triangle1Vertices<span class="hl opt">,</span> triangle2Vertices<span class="hl opt">].</span><span class="hl kwd">flat</span><span class="hl opt">();</span>
<span class="hl kwa">const</span> sourceTl <span class="hl opt">=</span> allVertices<span class="hl opt">.</span><span class="hl kwd">reduce</span><span class="hl opt">(</span>tl<span class="hl opt">);</span>
<span class="hl kwa">const</span> sourceBr <span class="hl opt">=</span> allVertices<span class="hl opt">.</span><span class="hl kwd">reduce</span><span class="hl opt">(</span>br<span class="hl opt">);</span>
</pre>

<svg width="100%" height="180px" viewbox="0 -15 800 165">
  <rect x="9" y="6" width="252" height="114" fill="none" stroke="grey" stroke-width="1"/>
  <text x="15" y="25" font="16px monospace" fill="#666">(0.03, 0.02)</text>
  <circle cx="9" cy="6" r="2" fill="#666"/>
  <text x="265" y="140" font="16px monospace" fill="#666">(0.87, 0.34)</text>
  <circle cx="261" cy="120" r="2" fill="#666"/>
  <g transform="scale(3)">
    <path d="M 3 21 L 31 40 L 42 30" fill="#00f" stroke="none"/>
    <path d="M 53 25 L 87 9 86 2" fill="#f00" stroke="none"/>
  </g>
</svg>

And use our `sourceTl` and `sourceBr` to transform this scene onto a larger
canvas (say the 6000x3000px window with 500px margins from before):

<pre class="hl"><span class="hl kwa">const</span> transform <span class="hl opt">=</span> <span class="hl kwd">transformFn</span><span class="hl opt">(</span>sourceTl<span class="hl opt">,</span> sourceBr<span class="hl opt">, [</span><span class="hl num">500</span><span class="hl opt">,</span> <span class="hl num">500</span><span class="hl opt">], [</span><span class="hl num">5500</span><span class="hl opt">,</span> <span class="hl num">2500</span><span class="hl opt">]);</span>
triangle1Vertices <span class="hl opt">=</span> triangle1Vertices<span class="hl opt">.</span><span class="hl kwd">map</span><span class="hl opt">(</span>transform<span class="hl opt">);</span>
triangle2Vertices <span class="hl opt">=</span> triangle2Vertices<span class="hl opt">.</span><span class="hl kwd">map</span><span class="hl opt">(</span>transform<span class="hl opt">);</span>

<span class="hl slc">// rest of draw code ...</span>
</pre>

<svg width="100%" height="370px" viewbox="0 -20 800 350">
  <rect x="0" y="0" width="600" height="300" fill="none" stroke="grey" stroke-width="1"/>
  <path d="M 79.95 150 L 226.32 250 284.21 197.34" fill="#00f" stroke="none"/>
  <path d="M 342.11 171.05 L 521.05 86.84 515.79 50" fill="#f00" stroke="none"/>
  <text x="555" y="320" font="16px monospace" fill="#666">(6000, 3000)</text>
  <circle cx="600" cy="300" r="2" fill="#666"/>
</svg>

And voila! A nicely centered render.

### Tiled rendering

If you're making _massive_ generative artworks (e.g. printing a mural) that
require a resolution larger than what your browser or library supports, a
common workaround is to render your artwork piece by piece in "tiles", each
small enough to render individually. The `transformFn` can be used here as well
to project your output onto each individual tile.

<pre class="hl"><span class="hl kwa">const</span> FINAL_RES <span class="hl opt">= [</span><span class="hl num">10000</span><span class="hl opt">,</span> <span class="hl num">10000</span><span class="hl opt">];</span>
<span class="hl kwa">const</span> TILE_COUNT <span class="hl opt">= [</span><span class="hl num">10</span><span class="hl opt">,</span> <span class="hl num">10</span><span class="hl opt">];</span>
<span class="hl kwa">const</span> TILE_RES <span class="hl opt">= [</span>
  Math<span class="hl opt">.</span><span class="hl kwd">floor</span><span class="hl opt">(</span>FINAL_RES<span class="hl opt">[</span><span class="hl num">0</span><span class="hl opt">] /</span> TILE_COUNT<span class="hl opt">[</span><span class="hl num">0</span><span class="hl opt">]),</span>
  Math<span class="hl opt">.</span><span class="hl kwd">floor</span><span class="hl opt">(</span>FINAL_RES<span class="hl opt">[</span><span class="hl num">1</span><span class="hl opt">] /</span> TILE_COUNT<span class="hl opt">[</span><span class="hl num">1</span><span class="hl opt">]),</span>
<span class="hl opt">];</span>

<span class="hl kwa">function</span> <span class="hl kwd">transformToTileFn</span><span class="hl opt">(</span>sourceTl<span class="hl opt">,</span> sourceBr<span class="hl opt">,</span> tileCoords<span class="hl opt">) {</span>
  <span class="hl kwa">const</span> destTl <span class="hl opt">= [-</span>tileCoords<span class="hl opt">[</span><span class="hl num">0</span><span class="hl opt">] *</span> TILE_RES<span class="hl opt">[</span><span class="hl num">0</span><span class="hl opt">], -</span>tileCoords<span class="hl opt">[</span><span class="hl num">1</span><span class="hl opt">] *</span> TILE_RES<span class="hl opt">[</span><span class="hl num">1</span><span class="hl opt">]];</span>
  <span class="hl kwa">const</span> destBr <span class="hl opt">= [</span>destTl<span class="hl opt">[</span><span class="hl num">0</span><span class="hl opt">] +</span> FINAL_RES<span class="hl opt">[</span><span class="hl num">0</span><span class="hl opt">],</span> destTl<span class="hl opt">[</span><span class="hl num">1</span><span class="hl opt">] +</span> FINAL_RES<span class="hl opt">[</span><span class="hl num">1</span><span class="hl opt">]];</span>
  <span class="hl kwa">return</span> <span class="hl kwd">transformFn</span><span class="hl opt">(</span>sourceTl<span class="hl opt">,</span> sourceBr<span class="hl opt">,</span> destTl<span class="hl opt">,</span> destBr<span class="hl opt">);</span>
<span class="hl opt">}</span>
</pre>

---

And that's it! I hope this approach is helpful to you. Personally, I find that
the biggest advantage is never having to think in terms of "screen" coordinate
space (i.e. in pixels, or centimeters for plotting) when writing code for a
generative system, knowing that however the program evaluates, it can neatly be
mapped onto any size screen at the end.
