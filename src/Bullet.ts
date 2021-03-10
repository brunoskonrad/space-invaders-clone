import bullet from "../assets/images/laser-bullet.png";
import { Renderer } from "./core/rendering/Renderer";
import { sumVectors, vec2 } from "./core/Vector2";

// TODO extract this logic to reuse it for all sprites
function createImage() {
  const image = new Image();
  image.src = bullet;
  return image;
}

export class Bullet {
  image: HTMLImageElement = null;

  width = 9;
  height = 37;

  SPEED = 600;

  position = vec2(250, 1000);

  constructor() {
    this.image = createImage();
  }

  update(deltaTime: number) {
    this.position = sumVectors(this.position, vec2(0, -this.SPEED * deltaTime));
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
