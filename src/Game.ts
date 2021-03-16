import { GameLoop } from "./core/GameLoop";
import { Input } from "./core/Input";
import { Renderer } from "./core/rendering/Renderer";
import { World } from "./World";

export class Game extends GameLoop {
  world: World;

  constructor() {
    super();

    Input.init();
    this.world = new World();

    window.world = this.world;
  }

  update(deltaTime: number) {
    // TODO: move collision detection to another place
    this.world.collidableEntites.forEach((a) => {
      this.world.collidableEntites.forEach((b) => {
        if (a !== b) {
          if (a.collider.detectCollision(b.collider)) {
            a.onCollide ? a.onCollide(b.collider) : null;
          }
        }
      });
    });

    this.world.entities.forEach((entity) => entity.update(deltaTime));
  }

  render() {
    Renderer.instance.clear();
    this.world.entities.forEach((entity) => entity.render());
  }
}
