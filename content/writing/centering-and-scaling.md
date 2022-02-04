---
title: "Centering and Scaling Your Generative Art"
date: 2022-01-23
draft: false
---

There's something unique to generative art when it comes deciding how to frame
your subject:

1. Screens come in all sorts of shapes and resolutions, and you have the option
   to adapt your generative art to the screen it's shown on.
2. Scaling, cropping, and shifting your art to fit a frame must be done
   programatically. In some cases, the generative systems are chaotic and
   unpredicatable, meaning a 

Recently, in particular on [fx(hash)](https://fxhash.xyz), I've seen a lot of
struggle around getting artwork to scale to a variety of screen sizes.
Fortunately, there is a straightfoward solution to this. Unfortunately, it's
not a drop-in solution and may require restructuring your code a little.

Why such a complicated function?

## TL;DR

the tl;dr

<pre class="hl">
<span class="hl com">/**</span>
<span class="hl com"> * Returns a function that translates from user to screen coordinates given the</span>
<span class="hl com"> * top-left and bottom-right points bounding your draw-area in user</span>
<span class="hl com"> * coordinates, and the target dimensions and margin in screen coordinates.</span>
<span class="hl com"> *</span>
<span class="hl com"> * &#64;param {[number, number]} tl - The top-left point of your bounding rect.</span>
<span class="hl com"> * &#64;param {[number, number]} br - The bottom-right point of your bounding rect.</span>
<span class="hl com"> * &#64;param {[number, number]} dimensions - The target screen dimensions.</span>
<span class="hl com"> * &#64;param {[number, number]|number} margin - The (optional) margin to apply,</span>
<span class="hl com"> *                                           provided in screen coordinates.</span>
<span class="hl com"> */</span>
<span class="hl kwa">function</span> <span class="hl kwd">makeCenterFn</span><span class="hl opt">(</span>tl<span class="hl opt">,</span> br<span class="hl opt">,</span> dimensions<span class="hl opt">,</span> margin <span class="hl opt">=</span> <span class="hl num">0</span><span class="hl opt">.) {</span>
  margin <span class="hl opt">=</span> <span class="hl kwa">typeof</span> margin <span class="hl opt">===</span> <span class="hl str">&apos;number&apos;</span> <span class="hl opt">? [</span>margin<span class="hl opt">,</span> margin<span class="hl opt">] :</span> margin<span class="hl opt">;</span>

  <span class="hl kwa">const</span> <span class="hl opt">[</span>tlx<span class="hl opt">,</span> tly<span class="hl opt">] =</span> tl<span class="hl opt">;</span>
  <span class="hl kwa">const</span> <span class="hl opt">[</span>brx<span class="hl opt">,</span> bry<span class="hl opt">] =</span> br<span class="hl opt">;</span>
  <span class="hl kwa">const</span> <span class="hl opt">[</span>sx<span class="hl opt">,</span> sy<span class="hl opt">] =</span> dimensions<span class="hl opt">;</span>
  <span class="hl kwa">const</span> <span class="hl opt">[</span>mx<span class="hl opt">,</span> my<span class="hl opt">] =</span> margin<span class="hl opt">;</span>

  <span class="hl slc">// Compute the diagonal vector for both user &amp; screen coordinates. </span>
  <span class="hl kwa">const</span> <span class="hl opt">[</span>userx<span class="hl opt">,</span> usery<span class="hl opt">] = [</span>brx <span class="hl opt">-</span> tlx<span class="hl opt">,</span> bry <span class="hl opt">-</span> tly<span class="hl opt">];</span>
  <span class="hl kwa">const</span> <span class="hl opt">[</span>screenx<span class="hl opt">,</span> screeny<span class="hl opt">] = [</span>sx <span class="hl opt">-</span> mx <span class="hl opt">*</span> <span class="hl num">2</span><span class="hl opt">,</span> sy <span class="hl opt">-</span> my <span class="hl opt">*</span> <span class="hl num">2</span><span class="hl opt">];</span>

  <span class="hl slc">// Find the minimum amount to scale the user draw-area by to fill the screen.</span>
  <span class="hl kwa">const</span> <span class="hl opt">[</span>ratiox<span class="hl opt">,</span> ratioy<span class="hl opt">] = [</span>screenx <span class="hl opt">/</span> userx<span class="hl opt">,</span> screeny<span class="hl opt">,</span> usery<span class="hl opt">];</span>
  <span class="hl kwa">const</span> scale <span class="hl opt">=</span> Math<span class="hl opt">.</span><span class="hl kwd">min</span><span class="hl opt">(</span>ratiox<span class="hl opt">,</span> ratioy<span class="hl opt">);</span>

  <span class="hl slc">// If ratiox !== ratioy, we need to shift our scaled coordinates to the</span>
  <span class="hl slc">// center of the screen.</span>
  <span class="hl kwa">const</span> <span class="hl opt">[</span>scaledx<span class="hl opt">,</span> scaledy<span class="hl opt">] = [</span>userx <span class="hl opt">*</span> scale<span class="hl opt">,</span> usery <span class="hl opt">*</span> scale<span class="hl opt">];</span>
  <span class="hl kwa">const</span> <span class="hl opt">[</span>tocx<span class="hl opt">,</span> tocy<span class="hl opt">] = [(</span>screenx <span class="hl opt">-</span> scaledx<span class="hl opt">) /</span> <span class="hl num">2</span><span class="hl opt">, (</span>screeny <span class="hl opt">-</span> scaledy<span class="hl opt">) /</span> <span class="hl num">2</span><span class="hl opt">];</span>
  <span class="hl kwa">const</span> <span class="hl opt">[</span>offsetx<span class="hl opt">,</span> offsety<span class="hl opt">] = [</span>tocx <span class="hl opt">+</span> mx<span class="hl opt">,</span> tocy <span class="hl opt">+</span> my<span class="hl opt">];</span>

  <span class="hl slc">// At this point, we translate from user to screen coordinates using</span>
  <span class="hl slc">//     (pt - tl) * scale + offset</span>
  <span class="hl slc">// We can skip one arithmatic operation if we rewrite that as</span>
  <span class="hl slc">//     pt * scale - tl * scale + offset</span>
  <span class="hl slc">// ... and precompute the constants.</span>
  <span class="hl kwa">const</span> <span class="hl opt">[</span>bx<span class="hl opt">,</span> by<span class="hl opt">] = [-</span>tlx <span class="hl opt">*</span> scale <span class="hl opt">+</span> offsetx<span class="hl opt">, -</span>tly <span class="hl opt">*</span> scale <span class="hl opt">+</span> offsety<span class="hl opt">];</span>

  <span class="hl slc">// The result is a mapping from user to screen coordinates.</span>
  <span class="hl kwa">return</span> <span class="hl opt">(</span>inp<span class="hl opt">) =&gt; {</span>
    <span class="hl slc">// Scalar values (such as stroke-width, or radius) are only scaled by a</span>
    <span class="hl slc">// constant, not translated.</span>
    <span class="hl kwa">if</span> <span class="hl opt">(</span><span class="hl kwa">typeof</span> inp <span class="hl opt">===</span> <span class="hl str">&apos;number&apos;</span><span class="hl opt">) {</span>
      <span class="hl kwa">return</span> inp <span class="hl opt">*</span> scale<span class="hl opt">;</span>
    <span class="hl opt">}</span>
    <span class="hl kwa">const</span> <span class="hl opt">[</span>x<span class="hl opt">,</span> y<span class="hl opt">] =</span> inp<span class="hl opt">;</span>
    <span class="hl kwa">return</span> <span class="hl opt">[</span>x <span class="hl opt">*</span> scale <span class="hl opt">+</span> bx<span class="hl opt">,</span> y <span class="hl opt">*</span> scale <span class="hl opt">+</span> by<span class="hl opt">];</span>
  <span class="hl opt">}</span>
<span class="hl opt">}</span>
</pre>
<!--HTML generated by highlight 3.41, http://www.andre-simon.de/-->


### Usage examples

<svg width="100%" height="120px">
  <text x="2px" y="38px" style="font:16px monospace;fill:darkblue">■</text>
  <text x="25px" y="40px" style="font:16px monospace;fill:darkblue">User Coordinates</text>
  <text x="2px" y="68px" style="font:16px monospace;fill:tomato">■</text>
  <text x="25px" y="70px" style="font:16px monospace;fill:tomato">Screen Coordinates</text>
  <text x="2px" y="98px" style="font:16px monospace;fill:black">|</text>
  <text x="25px" y="100px" style="font:16px monospace;fill:black">Translated Draw Area</text>
</svg>

Translating from unit coordinates to a 1000x1000px screen.

```
const centerFn = makeCenterFn([0, 0], [1, 1], [1000, 1000]);
centerFn([0, 0]);     // === [0, 0]
centerFn([1, 1]);     // === [1000, 1000]
centerFn([0.6, 0.8]); // === [600, 800]
```

<svg width="100%" height="370px" viewbox="0 0 580 370">
  <defs>
    <marker id="arrowhead" markerWidth="4" markerHeight="4" refX="2" refY="2" orient="auto">
      <polygon fill="grey" points="0 0, 4 2, 0 4" />
    </marker>
  </defs>
  <text x="20px" y="72px" style="font:15px monospace;fill:darkblue">(0, 0)</text>
  <text x="170px" y="268px" style="font:15px monospace;fill:darkblue">(1, 1)</text>
  <text x="92px" y="196px" style="font:15px monospace;fill:darkblue">(0.6, 0.8)</text>
  <rect x="50px" y="90px" width="150px" height="150px" style="fill:none;stroke:darkblue;stroke-width:4px"/>
  <text x="300px" y="22px" style="font:15px monospace;fill:salmon">(0, 0)</text>
  <text x="550px" y="320px" style="font:15px monospace;fill:salmon">(1000, 1000)</text>
  <rect x="330px" y="40px" width="250px" height="250px" style="fill:none;stroke:salmon;stroke-width:4px"/>
  <rect x="330px" y="40px" width="250px" height="250px" style="fill:none;stroke:black;stroke-width:1px"/>
  <line x1="50px" y1="90px" x2="330px" y2="40px" marker-end="url(#arrowhead)" style="stroke:grey;stroke-width:3px;stroke-linecap:round;stroke-dasharray:6"/>
  <line x1="200px" y1="240px" x2="580px" y2="290px" marker-end="url(#arrowhead)" style="stroke:grey;stroke-width:3px;stroke-linecap:round;stroke-dasharray:6"/>
  <line x1="140px" y1="210px" x2="480px" y2="250px" marker-end="url(#arrowhead)" style="stroke:grey;stroke-width:3px;stroke-linecap:round;stroke-dasharray:6"/>
  <circle cx="140px" cy="210px" r="4px" style="fill:darkblue"/>
  <circle cx="480px" cy="250px" r="4px" style="fill:salmon"/>
</svg>

---

Translating from unit coordinates to a 1000x1000px screen with a 100px margin.

```
> const centerFn = makeCenterFn([0, 0], [1, 1], [1000, 1000], 100);
> centerFn([0, 0]); // === [100, 100]
> centerFn([1, 1]); // === [900, 900]
```

<svg width="100%" height="370px" viewbox="0 0 580 370">
  <defs>
    <marker id="arrowhead" markerWidth="4" markerHeight="4" refX="2" refY="2" orient="auto">
      <polygon fill="grey" points="0 0, 4 2, 0 4" />
    </marker>
  </defs>
  <text x="20px" y="72px" style="font:15px monospace;fill:darkblue">(0, 0)</text>
  <text x="170px" y="268px" style="font:15px monospace;fill:darkblue">(1, 1)</text>
  <rect x="50px" y="90px" width="150px" height="150px" style="fill:none;stroke:darkblue;stroke-width:4px"/>
  <text x="300px" y="22px" style="font:15px monospace;fill:salmon">(0, 0)</text>
  <text x="550px" y="320px" style="font:15px monospace;fill:salmon">(1000, 1000)</text>
  <rect x="330px" y="40px" width="250px" height="250px" style="fill:none;stroke:salmon;stroke-width:4px"/>
  <rect x="355px" y="65px" width="200px" height="200px" style="fill:none;stroke:black;stroke-width:2px"/>
  <line x1="50px" y1="90px" x2="355px" y2="65px" marker-end="url(#arrowhead)" style="stroke:grey;stroke-width:3px;stroke-linecap:round;stroke-dasharray:6"/>
  <line x1="200px" y1="240px" x2="555px" y2="265px" marker-end="url(#arrowhead)" style="stroke:grey;stroke-width:3px;stroke-linecap:round;stroke-dasharray:6"/>
  <text x="350px" y="55px" style="font:15px monospace;stroke:white;stroke-width:6px">(100, 100)</text>
  <text x="350px" y="55px" style="font:15px monospace;fill:salmon">(100, 100)</text>
  <text x="470px" y="288px" style="font:15px monospace;stroke:white;stroke-width:6px">(900, 900)</text>
  <text x="470px" y="288px" style="font:15px monospace;fill:salmon">(900, 900)</text>
</svg>

---

Translating from unit coordinates to a 2000x1000px screen.

```
const centerFn = makeCenterFn([0, 0], [1, 1], [2000, 1000]);
centerFn([0, 0]); // === [500, 0]
centerFn([1, 1]); // === [1500, 1000]
```

<svg width="100%" height="370px" viewbox="0 0 920 370">
  <defs>
    <marker id="arrowhead" markerWidth="4" markerHeight="4" refX="2" refY="2" orient="auto">
      <polygon fill="grey" points="0 0, 4 2, 0 4" />
    </marker>
  </defs>
  <text x="20px" y="72px" style="font:15px monospace;fill:darkblue">(0, 0)</text>
  <text x="170px" y="268px" style="font:15px monospace;fill:darkblue">(1, 1)</text>
  <rect x="50px" y="90px" width="150px" height="150px" style="fill:none;stroke:darkblue;stroke-width:4px"/>
  <text x="300px" y="22px" style="font:15px monospace;fill:salmon">(0, 0)</text>
  <text x="800px" y="320px" style="font:15px monospace;fill:salmon">(2000, 1000)</text>
  <text x="410px" y="22px" style="font:15px monospace;fill:salmon">(500, 0)</text>
  <text x="645px" y="320px" style="font:15px monospace;fill:salmon">(1500, 1000)</text>
  <rect x="330px" y="40px" width="500px" height="250px" style="fill:none;stroke:salmon;stroke-width:4px"/>
  <rect x="445px" y="40px" width="250px" height="250px" style="fill:none;stroke:black;stroke-width:2px"/>
  <line x1="50px" y1="90px" x2="445px" y2="40px" marker-end="url(#arrowhead)" style="stroke:grey;stroke-width:3px;stroke-linecap:round;stroke-dasharray:6"/>
  <line x1="200px" y1="240px" x2="695px" y2="290px" marker-end="url(#arrowhead)" style="stroke:grey;stroke-width:3px;stroke-linecap:round;stroke-dasharray:6"/>
</svg>

---

Translating from unit coordinates to a 2000x1000px screen with a 100px margin.

```
const centerFn = makeCenterFn([0, 0], [1, 1], [2000, 1000], 100);
centerFn([0, 0]); // === [600, 100]
centerFn([1, 1]); // === [1400, 900]
```

<svg width="100%" height="370px" viewbox="0 0 920 370">
  <defs>
    <marker id="arrowhead" markerWidth="4" markerHeight="4" refX="2" refY="2" orient="auto">
      <polygon fill="grey" points="0 0, 4 2, 0 4" />
    </marker>
  </defs>
  <text x="20px" y="72px" style="font:15px monospace;fill:darkblue">(0, 0)</text>
  <text x="170px" y="268px" style="font:15px monospace;fill:darkblue">(1, 1)</text>
  <rect x="50px" y="90px" width="150px" height="150px" style="fill:none;stroke:darkblue;stroke-width:4px"/>
  <text x="300px" y="22px" style="font:15px monospace;fill:salmon">(0, 0)</text>
  <text x="800px" y="320px" style="font:15px monospace;fill:salmon">(2000, 1000)</text>
  <rect x="330px" y="40px" width="500px" height="250px" style="fill:none;stroke:salmon;stroke-width:4px"/>
  <rect x="470px" y="65px" width="200px" height="200px" style="fill:none;stroke:black;stroke-width:2px"/>
  <line x1="50px" y1="90px" x2="470px" y2="65px" marker-end="url(#arrowhead)" style="stroke:grey;stroke-width:3px;stroke-linecap:round;stroke-dasharray:6"/>
  <line x1="200px" y1="240px" x2="670px" y2="265px" marker-end="url(#arrowhead)" style="stroke:grey;stroke-width:3px;stroke-linecap:round;stroke-dasharray:6"/>
  <text x="430px" y="48px" style="font:15px monospace;stroke:white;stroke-width:6px">(600, 100)</text>
  <text x="430px" y="48px" style="font:15px monospace;fill:salmon">(600, 100)</text>
  <text x="622px" y="299px" style="font:15px monospace;stroke:white;stroke-width:6px">(1400, 900)</text>
  <text x="622px" y="299px" style="font:15px monospace;fill:salmon">(1400, 900)</text>
</svg>

---
