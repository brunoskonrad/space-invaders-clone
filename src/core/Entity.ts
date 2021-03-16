import { World } from "../World";
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

  protected world: World;

  width = 0;
  height = 0;
  position: Vector2 = vec2(0, 0);

  constructor(world: World) {
    this.id = this.type + "_" + nextNumber();
    this.world = world;

    this.init();
  }

  init() {}

  unmount() {}

  update(_deltaTime: number) {}

  render() {}

  get type(): string {
    return this.constructor.name;
  }
}
