import { Entity } from "./core/Entity";

export class Life extends Entity {
  health = 3;

  init() {
    document.addEventListener("player-damage", this.onDamageTaken);
    document.addEventListener("aliens-out-of-screen", this.onDamageTaken);
  }

  unmount() {
    document.removeEventListener("player-damage", this.onDamageTaken);
    document.removeEventListener("aliens-out-of-screen", this.onDamageTaken);
  }

  onDamageTaken = () => {
    this.health -= 1;

    console.log("Hey");

    if (this.health === 0) {
      document.dispatchEvent(new CustomEvent("game-over"));
    }
  };
}
