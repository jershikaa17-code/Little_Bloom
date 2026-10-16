/*
 * Animated regions of the flat hero image. Each entry describes an object
 * already in school.png (centre x/y and half-size rx/ry, in source pixels).
 * A "part" is a soft-edged window onto the same image, aligned pixel-for-pixel
 * over the original, then moved slightly. Every motion also scales the part up
 * a little so it always covers the original underneath — no doubled edges.
 * Order matters: later parts paint above earlier ones where windows overlap.
 */
window.HERO_IMAGE = { src: './assets/images/school.png', width: 1536, height: 1024 };

/*
 * Headline letters, measured from the image. Each line is a clipping strip
 * (top/bottom); cuts are the x boundaries between letters, placed in the gaps.
 * A lift wave runs through the lines in reading order once per cycle.
 */
window.HERO_TEXT = {
  cycle: 7,
  startDelay: 0.6,
  lines: [
    { name: 'tagline', top: 158, bottom: 198, step: 0.03, cuts: [87, 107, 122, 141, 157, 171, 184, 195, 211, 242, 259, 276, 289, 302, 318, 340, 354, 379, 390, 416, 431, 447, 461, 487] },
    { name: 'nurturing', top: 199, bottom: 278, step: 0.06, cuts: [88, 139, 180, 210, 240, 281, 313, 332, 374, 418] },
    { name: 'little-minds', top: 279, bottom: 357, step: 0.06, cuts: [88, 139, 160, 237, 263, 323, 407, 431, 483, 537, 579] },
    { name: 'brighter-future', top: 372, bottom: 446, step: 0.06, cuts: [86, 146, 177, 226, 269, 293, 306, 342, 374, 398, 430, 463, 503, 534, 560, 594, 649] }
  ]
};

/*
 * Pointer-proximity reaction, layered on top of the looping animations.
 * lift is % of the piece's own height, rotate in degrees. Keep scale growth
 * ((scale - 1) / 2) at least as large as lift so the copy still covers its original.
 * reach: extra source pixels around each object where the pointer starts to count.
 */
window.HERO_HOVER = {
  reach: 50,
  letter:  { rx: 95, ry: 70, lift: 7, scale: 1.16 },
  default: { lift: 4, scale: 1.1 },
  twinkle: { scale: 1.35, rotate: 18 },
  sun:     { scale: 1.1, rotate: 8 },
  fly:     { lift: 3, scale: 1.12 },
  soar:    { lift: 1.5, scale: 1.04 },
  hop:     { lift: 1.5, scale: 1.04 },
  breathe: { lift: 1.5, scale: 1.05, rotate: 2 },
  drift:   { lift: 2, scale: 1.06 },
  cta:     { lift: 3, scale: 1.07 },
  pop:     { lift: 5, scale: 1.16 },
  tile:    { scale: 1.05 },
  burst:   { scale: 1.3 },
  ring:    { scale: 1.25, rotate: 14 },
  nudge:   { scale: 1.3 }
};

/*
 * By request: the sun, the two clouds, the bird, every star and the left
 * leaf animate on their own, always. The girl, boy and teddy stay perfectly
 * still until the pointer hovers them, then they react (soar/hop/breathe)
 * and settle back — see .part--soar/.part--hop/.part--breathe in
 * css/landing.css, which deliberately carry no idle keyframe.
 */
window.HERO_PARTS = [
  { name: 'sun',            x: 1412, y: 193, rx: 92,  ry: 84,  motion: 'sun',     dur: 10 },
  { name: 'cloud',          x: 695,  y: 178, rx: 95,  ry: 56,  motion: 'drift',   dur: 9 },
  { name: 'cloud-rainbow',  x: 1313, y: 340, rx: 50,  ry: 30,  motion: 'drift',   dur: 11, delay: -4 },
  { name: 'bird',           x: 862,  y: 170, rx: 68,  ry: 68,  motion: 'fly',     dur: 3.6, core: 84 },

  { name: 'girl',           x: 815,  y: 458, rx: 150, ry: 232, motion: 'soar',    dur: 5,  core: 86 },
  { name: 'boy',            x: 1352, y: 502, rx: 100, ry: 136, motion: 'hop',     dur: 4.2, core: 84 },
  { name: 'teddy',          x: 1380, y: 722, rx: 92,  ry: 92,  motion: 'breathe', dur: 4.8 },

  { name: 'star-bird',      x: 942,  y: 205, rx: 20,  ry: 20,  motion: 'twinkle', dur: 2.6 },
  { name: 'star-sun',       x: 1310, y: 159, rx: 20,  ry: 20,  motion: 'twinkle', dur: 3.1, delay: -1 },
  { name: 'star-left',      x: 645,  y: 537, rx: 30,  ry: 30,  motion: 'twinkle', dur: 3.4, delay: -0.6 },
  { name: 'star-tiny-left', x: 693,  y: 587, rx: 12,  ry: 12,  motion: 'twinkle', dur: 2.2, delay: -1.5 },
  { name: 'star-bottom',    x: 827,  y: 705, rx: 26,  ry: 26,  motion: 'twinkle', dur: 2.9, delay: -2.1 },
  { name: 'star-right',     x: 1479, y: 553, rx: 26,  ry: 26,  motion: 'twinkle', dur: 3.3, delay: -0.3 },
  { name: 'star-rainbow',   x: 1289, y: 410, rx: 11,  ry: 11,  motion: 'twinkle', dur: 2.4, delay: -1.8 },

  { name: 'leaf-left',      x: 35,   y: 590, rx: 45,  ry: 95,  motion: 'drift',   dur: 8,   delay: -3 },

  { name: 'burst-tagline',  x: 505,  y: 168, rx: 15,  ry: 20,  motion: 'burst',   dur: 2.4, origin: '10% 50%' },
  { name: 'burst-minds',    x: 610,  y: 314, rx: 30,  ry: 36,  motion: 'burst',   dur: 2.4, delay: -1.2, origin: '15% 70%' },

  { name: 'tile-attendance', x: 1042, y: 386, rx: 46, ry: 30, motion: 'tile', shape: 'tile' },
  { name: 'tile-activities', x: 1160, y: 386, rx: 42, ry: 30, motion: 'tile', shape: 'tile' },
  { name: 'tile-meals',      x: 1042, y: 474, rx: 46, ry: 30, motion: 'tile', shape: 'tile' },
  { name: 'tile-learning',   x: 1160, y: 474, rx: 42, ry: 30, motion: 'tile', shape: 'tile' },
  { name: 'tile-health',     x: 1042, y: 561, rx: 46, ry: 30, motion: 'tile', shape: 'tile' },
  { name: 'tile-messages',   x: 1160, y: 561, rx: 42, ry: 30, motion: 'tile', shape: 'tile' }
];
