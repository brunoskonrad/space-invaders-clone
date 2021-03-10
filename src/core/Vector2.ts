export interface Vector2 {
  x: number;
  y: number;
}

type VectorInput = Vector2 | number;

export function vec2(x, y): Vector2 {
  return { x, y };
}

vec2.sum = sumVectors;
vec2.subtract = subtractVectors; // TODO check if thers a better name?
vec2.times = timesVectors;

function sumVectors(a: VectorInput, b: VectorInput): Vector2 {
  const { x: xa, y: ya } = fixInput(a);
  const { x: xb, y: yb } = fixInput(b);

  return { x: xa + xb, y: ya + yb };
}

function subtractVectors(a: VectorInput, b: VectorInput): Vector2 {
  const { x: xa, y: ya } = fixInput(a);
  const { x: xb, y: yb } = fixInput(b);

  return { x: xa - xb, y: ya - yb };
}

function timesVectors(a: VectorInput, b: VectorInput): Vector2 {
  const { x: xa, y: ya } = fixInput(a);
  const { x: xb, y: yb } = fixInput(b);

  return { x: xa * xb, y: ya * yb };
}

function fixInput(input: VectorInput): Vector2 {
  if (typeof input === "number") {
    return { x: input, y: input };
  }

  return input;
}
