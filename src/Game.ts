import { Bullet } from "./Bullet";
import { GameLoop } from "./core/GameLoop";
import { Input } from "./core/Input";
import { Renderer } from "./core/rendering/Renderer";
import { Enemy } from "./Enemy";
import { Spaceship } from "./Spaceship";

export class Game extends GameLoop {
  world: World;

  constructor() {
    super();

    Input.init();
    this.world = new World();
  }

  update(deltaTime: number) {
    this.world.entities.forEach((entity) => entity.update(deltaTime));
  }

  render() {
    Renderer.instance.clear();
    this.world.entities.forEach((entity) => entity.render());
  }
}

export class World {
  entities: any[] = [];

  constructor() {
    this.entities.push(new Spaceship(this));
    this.entities.push(new Enemy());
  }

  instanciate(entity) {
    this.entities.push(entity);
  }
}
