import { Renderer } from "./core/rendering/Renderer";
import { vec2 } from "./core/Vector2";
import { Enemy } from "./Enemy";
import { Spaceship } from "./Spaceship";

export class World {
  entities: any[] = [];

  constructor() {
    this.entities.push(new Spaceship(this));

    for (let i = 1; i <= 5; i++) {
      const enemy = new Enemy(this);

      enemy.position = vec2(
        Math.min(
          Math.random() * Renderer.instance.canvas.width,
          Renderer.instance.canvas.width - 40
        ),
        -200 * i
      );

      this.entities.push(enemy);
    }
  }

  instanciate(entity) {
    this.entities.push(entity);
  }

  destroy(entity) {
    const index = this.entities.findIndex((e) => e === entity);

    if (index >= 0) {
      this.entities.splice(index, 1);
    }
  }

  get collidableEntites(): any[] {
    return this.entities.filter((e) => e.collider !== undefined);
  }
}
