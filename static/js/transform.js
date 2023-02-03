/**
 * Copyright 2022 Lars Wander
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Returns a function that transforms between the source and destination
 * coordinate space while preserving the ratio between the input x & y
 * dimensions.
 *
 * @param {[number, number]} stl Top-left point bounding the source.
 * @param {[number, number]} sbr Bottom-right point bounding the source.
 * @param {[number, number]} dtl Top-left point bounding the destination.
 * @param {[number, number]} dbr Bottom-right point bounding the destination.
 */
function transformFn(stl, sbr, dtl, dbr) {
  const [stlx, stly] = stl;
  const [sbrx, sbry] = sbr;
  const [dtlx, dtly] = dtl;
  const [dbrx, dbry] = dbr;

  // Compute the diagonal vector for both bounding rects.
  const [sdx, sdy] = [sbrx - stlx, sbry - stly];
  const [ddx, ddy] = [dbrx - dtlx, dbry - dtly];

  // Find the minimum amount to scale the user draw-area by to fill the screen.
  const [rx, ry] = [ddx / sdx, ddy / sdy];
  const a = Math.min(rx, ry);

  // Compute the translation to the center of the new coordinates, accounting 
  // for the fact that rx may not equal ry by centering the smaller dimension.
  const [ox, oy] = [(ddx - sdx * a) * 0.5 + dtlx, (ddy - sdy * a) * 0.5 + dtly];

  // At this point, we transform from user to screen coordinates using
  //     (pt - tl) * a + o
  // We can skip some arithmetic in our output function by rewriting as
  //     pt * a - tl * a + o
  // ... and folding the constants into the form
  //     pt * a + b
  const [bx, by] = [-stlx * a + ox, -stly * a + oy];

  return (inp) => {
    // Scalar values (such as stroke-width, or radius) are only scaled by a
    // constant, not translated.
    if (typeof inp === 'number') {
      return inp * a;
    }
    const [x, y] = inp;
    return [x * a + bx, y * a + by];
  }
}
