/** A small articulated silhouette. Wing joints lead the flexible fingertips. */
const TAU = Math.PI * 2;
const mix = (a: number, b: number, t: number) => a + (b - a) * t;
const unit = (n: number) => ((n % 1) + 1) % 1;
const smooth = (n: number) => { const t = Math.max(0, Math.min(1, n)); return t * t * (3 - 2 * t); };
const point = (x: number, y: number) => `${x.toFixed(2)} ${y.toFixed(2)}`;

function stroke(phase: number) {
  const t = unit(phase);
  // Short power stroke, longer folded recovery.
  return t < .36 ? -Math.cos(Math.PI * t / .36) : Math.cos(Math.PI * (t - .36) / .64);
}

export function wingPath(phase: number, far = false, glide = 0) {
  const t = unit(phase + (far ? .035 : 0));
  const recovery = t > .36 ? Math.sin(Math.PI * (t - .36) / .64) : 0;
  const spread = mix(1 - .3 * recovery, 1, glide);
  const sign = far ? 1 : -1;
  const span = (far ? 34 : 46) * spread;
  const rootX = far ? 51 : 48;
  const rootY = far ? 38 : 41;
  const depth = far ? .78 : 1;
  const x = (n: number) => rootX + sign * span * n;
  const lift = (offset: number) => mix(stroke(t + offset), -.22, glide) * depth;
  const elbowY = rootY + lift(.04) * 11;
  const wristY = rootY + lift(-.025) * 23;
  const tipY = rootY + lift(-.075) * 33;
  const fingerY = rootY + lift(-.09) * 17 + 4;
  return [
    `M${point(rootX, rootY)}`,
    `Q${point(x(.2), elbowY)} ${point(x(.48), wristY)}`,
    `Q${point(x(.72), wristY - 2)} ${point(x(1), tipY)}`,
    `Q${point(x(.65), rootY + lift(-.07) * 10)} ${point(x(.75), fingerY)}`,
    `Q${point(x(.42), rootY + 3)} ${point(x(.48), rootY + lift(-.045) * 12 + 7)}`,
    `Q${point(x(.22), rootY + 5)} ${point(x(.23), rootY + lift(0) * 6 + 8)}`,
    `Q${point(rootX - 3, rootY + 3)} ${point(rootX - 8, rootY + 5)}Z`,
  ].join(" ");
}

export const BAT_BODY = "M35 45Q42 35 53 36L56 30L59 35L62 28L64 36L69 39L63 42Q53 47 42 46L32 50L35 45Z";

export function wingPoseStyles(far: boolean) {
  return {
    "--wing-up": `path('${wingPath(0, far)}')`,
    "--wing-down": `path('${wingPath(.36, far)}')`,
    "--wing-folded": `path('${wingPath(.68, far)}')`,
  };
}

export function glideAmount(time: number, index: number) {
  const window = (time + index * 1.7) % 4.8;
  return smooth(window / .14) * (1 - smooth((window - .4) / .2));
}

/** A fresh shallow curve each pass, with heading derived from its tangent. */
export function flightPose(progress: number, width: number, height: number, index: number, pass: number) {
  const reverse = index === 1 || (index === 2 && pass % 2 === 1);
  const margin = Math.min(27, height * .34);
  const range = Math.max(0, height - margin * 2);
  const seed = index * 2.1 + pass * 1.37;
  const y = (value: number) => margin + range * value;
  const ys = [y(.42 + .18 * Math.sin(seed)), y(.12 + .12 * Math.sin(seed + 1)), y(.88 - .12 * Math.cos(seed)), y(.45 + .2 * Math.sin(seed + 2))];
  const xs = [-80, width * .27, width * .68, width + 80].map(n => reverse ? width - n : n);
  const t = progress;
  const u = 1 - t;
  const cubic = (v: number[]) => u ** 3 * v[0] + 3 * u * u * t * v[1] + 3 * u * t * t * v[2] + t ** 3 * v[3];
  const derivative = (v: number[]) => 3 * u * u * (v[1] - v[0]) + 6 * u * t * (v[2] - v[1]) + 3 * t * t * (v[3] - v[2]);
  const direction = reverse ? -1 : 1;
  const angle = Math.atan2(derivative(ys) * direction, derivative(xs) * direction) * 180 / Math.PI;
  return { x: cubic(xs), y: cubic(ys), angle, direction };
}

export function flapPhase(time: number, index: number) {
  return time * (5.4 + index * .55) + index * .23 + .07 * Math.sin(time * 1.6 + index * TAU / 3);
}
