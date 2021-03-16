import { Entity } from "./core/Entity";
import { Renderer } from "./core/rendering/Renderer";
import { vec2 } from "./core/Vector2";

export class ScoreText extends Entity {
  TEXT_SIZE = 28;
  position = vec2(12, this.TEXT_SIZE);

  score = 0;

  init() {
    document.addEventListener("alient-hit", () => {
      this.score += 200;
    });
  }

  render() {
    const { context } = Renderer.instance;

    // Setup style
    context.fillStyle = "white";
    context.font = `${this.TEXT_SIZE}px monospace`;

    // TODO perhaps find a better way to align UI elements on screen
    context.fillText(this.score.toString(), this.position.x, this.position.y);
  }
}
