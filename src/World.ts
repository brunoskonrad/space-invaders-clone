import { Life } from "./Life";
import { ScoreText } from "./ScoreText";
import { Spaceship } from "./Spaceship";
import { wave } from "./Wave";

export class World {
  entities: any[] = [];

  score = 0;

  constructor() {
    this.entities.push(new Spaceship(this));

    // Simple wave system to let me code more mechanics
    wave(this, 5);
    setInterval(() => {
      wave(this, 5);
    }, 8000);

    this.entities.push(new ScoreText(this));
    this.entities.push(new Life(this));
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
