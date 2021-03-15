import enemy from "../assets/images/enemy-1.png";
import { Collider2D } from "./core/Collider2D";
import { Entity } from "./core/Entity";
import { Renderer } from "./core/rendering/Renderer";
import { vec2, Vector2 } from "./core/Vector2";

// TODO extract this logic to reuse it for all sprites
function createImage() {
  const image = new Image();
  image.src = enemy;
  return image;
}

export class Enemy extends Entity {
  image: HTMLImageElement = null;

  width = 40;
  height = 40;
  position: Vector2 = vec2(10, 600);

  collider = new Collider2D(this);

  // TODO work on speeds later
  SPEED: number = 300;
  direction: Vector2 = vec2(0, 0);

  constructor() {
    super();

    this.image = createImage();
  }

  update(deltaTime: number) {
    this.position = vec2.sum(
      this.position,
      vec2.times(this.direction, this.SPEED * deltaTime)
    );
  }

  render() {
    Renderer.instance.context.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}
