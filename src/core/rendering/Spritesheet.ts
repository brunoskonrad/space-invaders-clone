import { Entity } from "../Entity";
import { Renderer } from "./Renderer";

type SpridesheetOptions = {
  fps: number;
  repeat: boolean;
};

export class Spritesheet {
  isPlaying = true;

  private image: HTMLImageElement;
  private size: number;

  private parent: Entity;

  private currentFrame = 0;
  private maxTime = 0;
  private count = 0;

  private options: SpridesheetOptions;

  constructor(
    image: HTMLImageElement,
    parent: Entity,
    options: Partial<SpridesheetOptions> = {}
  ) {
    this.image = image;
    this.size = this.image.height;
    this.options = { ...this.defaultOptions, ...options };
    this.maxTime = 1 / this.options.fps;

    this.parent = parent;
  }

  update(deltaTime) {
    if (!this.isPlaying) {
      return;
    }

    if (this.maxTime < this.count) {
      this.currentFrame++;

      if (this.currentFrame >= this.steps - 1) {
        this.currentFrame = 0;

        if (!this.options.repeat) {
          this.isPlaying = false;
        }
      }

      this.count = 0;
    }

    this.count += deltaTime;
  }

  render() {
    Renderer.instance.context.drawImage(
      this.image,
      this.currentFrame * this.size,
      0,
      this.size,
      this.size,
      this.parent.position.x,
      this.parent.position.y,
      this.parent.width,
      this.parent.height
    );
  }

  private get defaultOptions(): SpridesheetOptions {
    return {
      fps: this.steps,
      repeat: true,
    };
  }

  private get steps(): number {
    return this.image.width / this.size;
  }
}
