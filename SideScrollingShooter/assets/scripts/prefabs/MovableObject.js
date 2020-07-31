class MovableObject extends Phaser.GameObjects.Sprite {
  constructor(data) {
    super(data.scene, data.x, data.y, data.texture, data.frame);
    this.init(data);
  }

  init({ velocity }) {
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.body.enable = true;
    this.velocity = velocity;
    this.scene.events.on("update", this.update, this);
  }

  reset(x, y) {
    this.x = x;
    this.y = y;

    this.setAlive(true);
  }

  isDead() {
    return false;
  }

  update() {
    if (this.active && this.isDead()) {
      this.setAlive(false);
    }
  }

  setAlive(status) {
    this.body.enable = status;
    this.setVisible(status);
    this.setActive(status);

    if (this.timer) {
      this.timer.paused = !status;
    }

    if (!status) {
      this.emit("killed");
    }
  }

  move() {
    this.body.setVelocityX(this.velocity);
  }
}
