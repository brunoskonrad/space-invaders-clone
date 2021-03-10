export class GameLoop {
  animationFrameRef: number;

  lastTime: number;
  lag: number = 0.0;
  isRunning: boolean = false;

  static MS_UPDATE_RATE = 1 / 60;

  update(_deltaTime: number) {
    throw new Error("Must implement `update(deltaTime: number): void`");
  }

  render() {
    throw new Error("Must implement `render(): void`");
  }

  start = () => {
    this.lastTime = Date.now();
    this.isRunning = true;
    this.tick();
  };

  stop = () => {
    cancelAnimationFrame(this.animationFrameRef);
    this.isRunning = false;
  };

  private tick = () => {
    const current = Date.now();
    const ellapsed = (current - this.lastTime) / 1000;
    this.lastTime = current;
    this.lag += ellapsed;

    this.update(ellapsed);

    while (this.lag >= GameLoop.MS_UPDATE_RATE) {
      this.render();

      this.lag -= GameLoop.MS_UPDATE_RATE;
    }

    this.lastTime = current;
    this.animationFrameRef = requestAnimationFrame(this.tick);
  };
}
