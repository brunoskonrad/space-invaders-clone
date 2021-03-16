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

    // TODO this is a huge hack please find a better fix later
    // or perhaps this one is the fix already :D
    setTimeout(() => {
      this.init();
    }, 100);
  }

  init() {}

  unmount() {}

  update(_deltaTime: number) {}

  render() {}

  get type(): string {
    return this.constructor.name;
  }
}
