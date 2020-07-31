class Fire extends MovableObject {
  static generate(scene, source) {
    return new Fire({
      scene,
      x: source.x,
      y: source.y,
      texture: source.bullet.texture,
      velocity: source.bullet.velocity,
    });
  }

  isDead() {
    return this.x < -this.width || this.x > config.width + this.width;
  }
}
