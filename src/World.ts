import { Renderer } from "./core/rendering/Renderer";
import { vec2 } from "./core/Vector2";
import { Enemy } from "./Enemy";
import { ScoreText } from "./ScoreText";
import { Spaceship } from "./Spaceship";

export class World {
  entities: any[] = [];

  score = 0;

  constructor() {
    this.entities.push(new Spaceship(this));

    // First wave
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

    this.entities.push(new ScoreText(this));
  }

  instanciate(entity) {
    this.entities.push(entity);
  }

  destroy(entity) {
    const index = this.entities.findIndex((e) => e === entity);

    if (index >= 0) {
      const removedEntities = this.entities.splice(index, 1);

      removedEntities.forEach((entity) => entity.unmount());
    }
  }

  get collidableEntites(): any[] {
    return this.entities.filter((e) => e.collider !== undefined);
  }
}
