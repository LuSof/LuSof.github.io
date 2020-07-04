let config = {
  type: Phaser.AUTO,
  rows: 2,
  cols: 5,
  cards: [1, 2, 3, 4, 5],
  timeout: 30,
  transparent: true,
  scene: new GameScene(),
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 1280,
    height: 720,
  },
};

let game = new Phaser.Game(config);
