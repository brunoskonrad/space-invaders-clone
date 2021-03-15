import { Enemy } from "./Enemy";
import { Spaceship } from "./Spaceship";

export class World {
  entities: any[] = [];

  constructor() {
    this.entities.push(new Spaceship(this));
    this.entities.push(new Enemy());
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
