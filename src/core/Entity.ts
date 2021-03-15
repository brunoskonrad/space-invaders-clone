import { vec2, Vector2 } from "./Vector2";

let interation = 0;

function nextNumber() {
  return interation++;
}

export interface Viewport {
  width: number;
  height: number;
  position: Vector2;
}

export class Entity implements Viewport {
  id: string;

  width = 0;
  height = 0;
  position: Vector2 = vec2(0, 0);

  constructor() {
    this.id = this.type + "_" + nextNumber();
  }

  get type(): string {
    return this.constructor.name;
  }
}
