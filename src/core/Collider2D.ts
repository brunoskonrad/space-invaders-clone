import { Entity, Viewport } from "./Entity";

export class Collider2D {
  parent: Entity;

  constructor(parent: Entity) {
    this.parent = parent;
  }

  detectCollision(collider: Collider2D): boolean {
    return detectRectCollision(this.parent, collider.parent);
  }
}

function detectRectCollision(a: Viewport, b: Viewport): boolean {
  if (
    a.position.x + a.width >= b.position.x &&
    a.position.x <= b.position.x + b.width &&
    a.position.y + a.height >= b.position.y &&
    a.position.y <= b.position.y + b.height
  ) {
    return true;
  }

  return false;
}
