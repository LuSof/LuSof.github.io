class Enemy extends MovableObject {
  static getAttributes() {
    return {
      x: config.width + 150,
      y: Phaser.Math.Between(100, config.height - 100),
      frame: `enemy${Phaser.Math.Between(1, 4)}`,
    };
  }

  static generate(scene, fires) {
    const { x, y, frame } = Enemy.getAttributes();

    return new Enemy({
      x,
      y,
      scene,
      frame,
      fires,
      texture: "enemy",
      velocity: -250,
      origin: {
        x: 0,
        y: 0.5,
      },
      bullet: {
        delay: 1000,
        texture: "bullet",
        velocity: -500,
      },
    });
  }

  init(data) {
    const { bullet, origin, fires } = data;

    super.init(data);
    this.setOrigin(origin.x, origin.y);

    this.fires = fires || new Fires(this.scene);

    this.timer = this.scene.time.addEvent({
      delay: bullet.delay,
      loop: true,
      callback: this.fire,
      callbackScope: this,
    });

    this.bullet = bullet;
  }

  reset() {
    const { x, y, frame } = Enemy.getAttributes();

    super.reset(x, y);
    this.setFrame(frame);
  }

  fire() {
    this.fires.createFire(this);
  }

  isDead() {
    return this.x < -this.width;
  }
}
