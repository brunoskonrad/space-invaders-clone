import playerShip from "../assets/images/player-ship.png";
import { Input } from "./core/Input";
import { Renderer } from "./core/rendering/Renderer";
import { sumVectors, timesVectors, vec2, Vector2 } from "./core/Vector2";

function createImage() {
  const image = new Image();
  image.src = playerShip;
  return image;
}

export class Spaceship {
  image: HTMLImageElement = null;

  width = 100;
  height = 100;
  position: Vector2 = vec2(0, Renderer.instance.canvas.height - 100);

  SPEED: number = 280;
  acceleration: Vector2 = vec2(0, 0);

  constructor() {
    this.image = createImage();
  }

  update(deltaTime: number) {
    const isMovingRight = Input.isActionPressed("move-right");
    const isMovingLeft = Input.isActionPressed("move-left");
    const isMovingUp = Input.isActionPressed("move-up");
    const isMovingDown = Input.isActionPressed("move-down");

    this.acceleration = vec2(
      this.getValue(isMovingRight, isMovingLeft),
      this.getValue(isMovingDown, isMovingUp)
    );

    this.position = sumVectors(
      this.position,
      timesVectors(this.speedVector, deltaTime)
    );
  }

  render() {
    // TODO Remove every Renderer reference
    Renderer.instance.context.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  // TODO this one looks super ugly and probably can be done in a better way
  private getValue(a: boolean, b: boolean): -1 | 0 | 1 {
    if (a && b) {
      return 0;
    } else if (b) {
      return -1;
    } else if (a) {
      return 1;
    }

    return 0;
  }

  private get speedVector() {
    return timesVectors(this.acceleration, this.SPEED);
  }
}
