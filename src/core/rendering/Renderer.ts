export class Renderer {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;

  static _instance: Renderer;

  constructor() {
    this.canvas = document.querySelector("canvas");
    this.context = this.canvas.getContext("2d");
  }

  static get instance() {
    if (!Renderer._instance) {
      Renderer._instance = new Renderer();
    }

    return Renderer._instance;
  }

  clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
