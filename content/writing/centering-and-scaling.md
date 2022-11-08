---
title: "Centering and Scaling"
date: 2022-01-23
draft: true 
---

The function I'm sharing here is probably my most used piece of code when it
comes to making generative art. Let me share the code, and then show some
examples to demonstrate why it's so useful.

## Code

> I'm releasing this under the 
> [Apache-2.0 License](https://www.apache.org/licenses/LICENSE-2.0). 

<pre class="hl"><span class="hl com">/**</span>
<span class="hl com"> * Returns a function that translates between the source and destination</span>
<span class="hl com"> * coordinate space while preserving the ratio between the input x &amp; y</span>
<span class="hl com"> * dimensions.</span>
<span class="hl com"> *</span>
<span class="hl com"> * &#64;param {[number, number]} stl Top-left point bounding the source.</span>
<span class="hl com"> * &#64;param {[number, number]} sbr Bottom-right point bounding the source.</span>
<span class="hl com"> * &#64;param {[number, number]} dtl Top-left point bounding the destination.</span>
<span class="hl com"> * &#64;param {[number, number]} dbr Bottom-right point bounding the destination.</span>
<span class="hl com"> */</span>
<span class="hl kwa">function</span> <span class="hl kwd">translateFn</span><span class="hl opt">(</span>stl<span class="hl opt">,</span> sbr<span class="hl opt">,</span> dtl<span class="hl opt">,</span> dbr<span class="hl opt">) {</span>
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

  <span class="hl slc">// At this point, we translate from user to screen coordinates using</span>
  <span class="hl slc">//     (pt - tl) * a + o</span>
  <span class="hl slc">// We can skip some arithmatic in our output function by rewriting as</span>
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

### Usage examples

<svg width="100%" height="120px">
  <text x="2px" y="38px" style="font:16px monospace;fill:darkblue">■</text>
  <text x="25px" y="40px" style="font:16px monospace;fill:darkblue">Source Coordinates</text>
  <text x="2px" y="68px" style="font:16px monospace;fill:tomato">■</text>
  <text x="25px" y="70px" style="font:16px monospace;fill:tomato">Destination Coordinates</text>
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
