class StartScene extends Phaser.Scene {
  constructor() {
    super("Start");
  }

  create(data) {
    this.createBackground();
    if (data.score !== undefined) {
      this.creatStats(data);
    }
    this.createText();
    this.setEvent();
  }

  creatStats({ score, completed }) {
    this.add
      .graphics()
      .fillStyle(0x000000, 0.5)
      .fillRoundedRect(
        config.width / 2 - 200,
        config.height / 2 - 200,
        400,
        400
      );

    const textTitle = completed ? "Level completed" : "Game Over";
    const textScore = `Score: ${score}`;
    const textStyle = {
      font: "40px CurseCasual",
      fill: "#ffffff",
    };

    this.add.text(config.width / 2, 250, textTitle, textStyle).setOrigin(0.5);
    this.add.text(config.width / 2, 350, textScore, textStyle).setOrigin(0.5);
  }

  createBackground() {
    this.add.sprite(0, 0, "bg").setOrigin(0);
  }

  createText() {
    this.add
      .text(config.width / 2, 500, "Tap to start", {
        font: "40px CurseCasual",
        fill: "#ffffff",
      })
      .setOrigin(0.5);
  }

  setEvent() {
    this.input.on("pointerdown", () => {
      this.scene.start("GameScene");
    });
  }
}
