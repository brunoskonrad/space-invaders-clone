type PressedKeys = { [key: string]: boolean };

const pressedKeys: PressedKeys = {};

// TODO find a way to de-couple these from this class
type Action = "move-left" | "move-right" | "move-up" | "move-down";
const ACTION_STATE: { [key in Action]: string[] } = {
  "move-left": ["ArrowLeft", "a"],
  "move-right": ["ArrowRight", "d"],
  "move-up": ["ArrowUp", "w"],
  "move-down": ["ArrowDown", "s"],
};

export class Input {
  static init() {
    document.addEventListener("keydown", this.onKeyDown);
    document.addEventListener("keyup", this.onKeyUp);
  }

  static isKeyPressed(key): boolean {
    return !!pressedKeys[key];
  }

  static isActionPressed(action: Action): boolean {
    return ACTION_STATE[action].map(this.isKeyPressed).some(Boolean);
  }

  static onKeyDown = (event) => {
    pressedKeys[event.key] = true;
  };

  static onKeyUp = (event) => {
    delete pressedKeys[event.key];
  };
}
