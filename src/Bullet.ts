import bullet from "../assets/images/laser-bullet.png";
import { Collider2D } from "./core/Collider2D";
import { Entity } from "./core/Entity";
import { Renderer } from "./core/rendering/Renderer";
import { vec2 } from "./core/Vector2";
import { Enemy } from "./Enemy";
import { World } from "./World";

// TODO extract this logic to reuse it for all sprites
function createImage() {
  const image = new Image();
  image.src = bullet;
  return image;
}

export class Bullet extends Entity {
  image: HTMLImageElement = null;

  width = 9;
  height = 37;
  position = vec2(250, 1000);

  SPEED = 600;

  collider = new Collider2D(this);

  constructor(world: World) {
    super(world);

    // TODO check why this one exploded on terminal
    // when calling inside "init"
    this.image = createImage();
  }

  update(deltaTime: number) {
    this.position = vec2.sum(this.position, vec2(0, -this.SPEED * deltaTime));

    if (this.position.y <= -100) {
      this.world.destroy(this);
    }
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

  // TODO make it typeable for other entities
  onCollide(b: Collider2D) {
    if (b.parent.type === "Enemy") {
      this.world.destroy(this);

      (b.parent as Enemy).die();

      document.dispatchEvent(new CustomEvent("alient-hit"));
    }
  }
}
