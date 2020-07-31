class Boom extends Phaser.GameObjects.Sprite {
  static generate(scene, x, y) {
    return new Boom({ scene, x, y });
  }

  constructor(data) {
    super(data.scene, data.x, data.y, "boom", "boom-1");
    this.scene.add.existing(this);

    const frames = this.scene.anims.generateFrameNames("boom", {
      prefix: "boom",
      start: 1,
      end: 4,
    });

    this.scene.anims.create({
      frames,
      key: "boom",
      frameRate: 10,
      repeat: 0,
    });

    this.play("boom");

    this.once(Phaser.Animations.Events.SPRITE_ANIMATION_COMPLETE, () => {
      this.destroy();
    });
  }
}
