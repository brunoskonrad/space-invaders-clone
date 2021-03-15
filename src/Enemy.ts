import enemy from "../assets/images/enemy-1.png";
import explosion from "../assets/images/explosion-6.png";
import { Collider2D } from "./core/Collider2D";
import { Entity } from "./core/Entity";
import { Renderer } from "./core/rendering/Renderer";
import { Spritesheet } from "./core/rendering/Spritesheet";
import { vec2, Vector2 } from "./core/Vector2";
import { World } from "./World";

// TODO extract this logic to reuse it for all sprites
function createImage(src: string) {
  const image = new Image();
  image.src = src;
  return image;
}

type EnemyState = "idle" | "dying";

export class Enemy extends Entity {
  image: HTMLImageElement = null;
  explosionImage: HTMLImageElement = null;

  explosionSpritesheet: Spritesheet;

  state: EnemyState = "idle";

  width = 40;
  height = 40;
  position: Vector2 = vec2(10, 0);

  collider = new Collider2D(this);

  // TODO work on speeds later
  SPEED: number = 200;
  direction: Vector2 = vec2(0, 1);

  constructor(world: World) {
    super(world);

    this.image = createImage(enemy);
    this.explosionImage = createImage(explosion);

    this.explosionSpritesheet = new Spritesheet(this.explosionImage, this, {
      fps: 18,
      repeat: false,
    });
  }

  update(deltaTime: number) {
    if (this.state === "dying") {
      this.explosionSpritesheet.update(deltaTime);

      if (!this.explosionSpritesheet.isPlaying) {
        this.world.destroy(this);
      }
    } else {
      this.position = vec2.sum(
        this.position,
        vec2.times(this.direction, this.SPEED * deltaTime)
      );
    }
  }

  render() {
    switch (this.state) {
      case "dying": {
        this.explosionSpritesheet.render();
        break;
      }
      case "idle":
      default:
        Renderer.instance.context.drawImage(
          this.image,
          this.position.x,
          this.position.y,
          this.width,
          this.height
        );
    }
  }

  die() {
    this.state = "dying";
  }
}
