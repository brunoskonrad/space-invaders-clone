import playerShip from "../assets/images/player-ship.png";
import { Bullet } from "./Bullet";
import { Input } from "./core/Input";
import { Renderer } from "./core/rendering/Renderer";
import { vec2, Vector2 } from "./core/Vector2";
import { World } from "./Game";

// TODO extract this logic to reuse it for all sprites
function createImage() {
  const image = new Image();
  image.src = playerShip;
  return image;
}

export class Spaceship {
  image: HTMLImageElement = null;

  width = 62;
  height = 80;
  position: Vector2 = vec2(0, Renderer.instance.canvas.height - 100);

  SPEED: number = 280;
  acceleration: Vector2 = vec2(0, 0);

  // TODO revisit this implementation
  world: World;

  // TODO replace for a throttle later
  private temporaryShootingDelay: number = 1;
  SHOOTING_DELAY_IN_SECONDS: number = 0.5;

  constructor(world: World) {
    this.image = createImage();
    this.world = world;
  }

  update(deltaTime: number) {
    this.handleInput(deltaTime);

    this.position = vec2.sum(
      this.position,
      vec2.times(this.speedVector, deltaTime)
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

  shoot() {
    const bullet = new Bullet();
    bullet.position = vec2(
      this.position.x + this.width / 2 - 3, // TODO why?
      this.position.y - 15
    );

    this.world.instanciate(bullet);
  }

  private handleInput(deltaTime: number) {
    // TODO throttle shoot
    this.temporaryShootingDelay += deltaTime;

    // Movement
    const isMovingRight = Input.isActionPressed("move-right");
    const isMovingLeft = Input.isActionPressed("move-left");
    const isMovingUp = Input.isActionPressed("move-up");
    const isMovingDown = Input.isActionPressed("move-down");

    this.acceleration = vec2(
      this.getValue(isMovingRight, isMovingLeft),
      this.getValue(isMovingDown, isMovingUp)
    );

    // Shooting
    if (
      Input.isActionPressed("shoot") &&
      this.temporaryShootingDelay >= this.SHOOTING_DELAY_IN_SECONDS
    ) {
      this.temporaryShootingDelay = 0;
      this.shoot();
    }
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
    return vec2.times(this.acceleration, this.SPEED);
  }
}
