import { GameLoop } from "./core/GameLoop";
import { Input } from "./core/Input";
import { Renderer } from "./core/rendering/Renderer";
import { Spaceship } from "./Spaceship";

export class Game extends GameLoop {
  entities: any[] = [];

  constructor() {
    super();

    Input.init();
    this.entities.push(new Spaceship());
  }

  update(deltaTime: number) {
    this.entities.forEach((entity) => entity.update(deltaTime));
  }

  render() {
    Renderer.instance.clear();
    this.entities.forEach((entity) => entity.render());
  }
}
