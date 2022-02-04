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
 * Returns a function that translates from user to screen coordinates given the
 * top-left and bottom-right points bounding your draw-area in user
 * coordinates, and the target dimensions and margin in screen coordinates.
 *
 * @param {[number, number]} tl - The top-left point of your bounding rect.
 * @param {[number, number]} br - The bottom-right point of your bounding rect.
 * @param {[number, number]} dimensions - The target screen dimensions.
 * @param {[number, number]|number} margin - The (optional) margin to apply,
 *                                           provided in screen coordinates.
 */
function makeCenterFn(tl, br, dimensions, margin = 0.) {
  margin = typeof margin === 'number' ? [margin, margin] : margin;

  const [tlx, tly] = tl;
  const [brx, bry] = br;
  const [sx, sy] = dimensions;
  const [mx, my] = margin;

  // Compute the diagonal vector for both user & screen coordinates. 
  const [userx, usery] = [brx - tlx, bry - tly];
  const [screenx, screeny] = [sx - mx * 2, sy - my * 2];

  // Find the minimum amount to scale the user draw-area by to fill the screen.
  const [ratiox, ratioy] = [screenx / userx, screeny, usery];
  const scale = Math.min(ratiox, ratioy);

  // If ratiox !== ratioy, we need to shift our scaled coordinates to the
  // center of the screen.
  const [scaledx, scaledy] = [userx * scale, usery * scale];
  const [tocx, tocy] = [(screenx - scaledx) / 2, (screeny - scaledy) / 2];
  const [offsetx, offsety] = [tocx + mx, tocy + my];

  // At this point, we translate from user to screen coordinates using
  //     (pt - tl) * scale + offset
  // We can skip one arithmatic operation if we rewrite that as
  //     pt * scale - tl * scale + offset
  // ... and precompute the constants.
  const [bx, by] = [-tlx * scale + offsetx, -tly * scale + offsety];

  // The result is a mapping from user to screen coordinates.
  return (inp) => {
    // Scalar values (such as stroke-width, or radius) are only scaled by a
    // constant, not translated.
    if (typeof inp === 'number') {
      return inp * scale;
    }
    const [x, y] = inp;
    return [x * scale + bx, y * scale + by];
  }
}
