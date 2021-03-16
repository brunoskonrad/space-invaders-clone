import { Renderer } from "./core/rendering/Renderer";
import { vec2 } from "./core/Vector2";
import { Enemy } from "./Enemy";
import { World } from "./World";

export function wave(world: World, numberOfEnemies: number) {
  for (let i = 1; i <= numberOfEnemies; i++) {
    const enemy = new Enemy(world);

    enemy.position = vec2(
      Math.min(
        Math.random() * Renderer.instance.canvas.width,
        Renderer.instance.canvas.width - 40
      ),
      -200 * i
    );

    world.entities.push(enemy);
  }
}
