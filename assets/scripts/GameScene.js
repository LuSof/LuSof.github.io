class GameScene extends Phaser.Scene {
  constructor() {
    super("Game");
  }

  preload() {
    // this.load.image("bg", "assets/sprites/background.png");
    this.load.image("card", "assets/sprites/card.png");

    this.load.image("card1", "assets/sprites/card1.png");
    this.load.image("card2", "assets/sprites/card2.png");
    this.load.image("card3", "assets/sprites/card3.png");
    this.load.image("card4", "assets/sprites/card4.png");
    this.load.image("card5", "assets/sprites/card5.png");

    this.load.audio("card", "assets/sounds/card.mp3");
    this.load.audio("complete", "assets/sounds/complete.mp3");
    this.load.audio("success", "assets/sounds/success.mp3");
    this.load.audio("theme", "assets/sounds/theme.mp3");
    this.load.audio("timeout", "assets/sounds/timeout.mp3");
  }

  createText() {
    this.timeoutText = this.add.text(10, 330, "", {
      font: "36px CurseCasual",
      fill: "#ffffff",
    });
  }

  onTimerTick() {
    this.timeoutText.setText(`Time: ${this.timeout}`);

    if (this.timeout <= 0) {
      this.timer.paused = true;
      this.sounds.timeout.play();

      this.restart();
    }

    --this.timeout;
  }

  createTimer() {
    this.timer = this.time.addEvent({
      delay: 1000,
      callback: this.onTimerTick,
      callbackScope: this,
      loop: true,
    });
  }

  createSounds() {
    this.sounds = {
      card: this.sound.add("card"),
      complete: this.sound.add("complete"),
      success: this.sound.add("success"),
      theme: this.sound.add("theme"),
      timeout: this.sound.add("timeout"),
    };

    this.sounds.theme.play({ volume: 0.1 });
  }

  create() {
    this.timeout = config.timeout;

    this.createSounds();
    this.createTimer();
    // this.createBackgrounds();
    this.createText();
    this.createCards();
    this.start();
  }

  restart() {
    let count = 0;

    const onCardMoveComplete = () => {
      ++count;

      if (count >= this.cards.length) {
        this.start();
      }
    };

    this.cards.forEach((card) => {
      card.move({
        x: this.sys.game.config.width + card.width,
        y: this.sys.game.config.height + card.height,
        delay: card.position.delay,
        callback: onCardMoveComplete,
      });
    });
  }

  start() {
    this.initCardsPositions();

    this.timeout = config.timeout;
    this.openedCard = null;
    this.openedCardsCount = 0;
    this.timer.paused = false;

    this.initCards();
    this.showCards();
  }

  initCards() {
    const positions = Phaser.Utils.Array.Shuffle(this.positions);

    this.cards.forEach((card) => {
      card.init(positions.pop());
    });
  }

  showCards() {
    this.cards.forEach((card) => {
      card.depth = card.position.delay;

      card.move({
        x: card.position.x,
        y: card.position.y,
        delay: card.position.delay,
      });
    });
  }

  createBackgrounds() {
    this.add.sprite(0, 0, "bg").setOrigin(0, 0);
  }

  createCards() {
    this.cards = [];

    for (let value of config.cards) {
      for (let i = 0; i < config.rows; i++) {
        this.cards.push(new Card(this, value));
      }
    }

    this.input.on("gameobjectdown", this.onCardClicked, this);
  }

  onCardClicked(pointer, card) {
    if (card.opened) {
      return;
    }

    this.sounds.card.play();

    if (this.openedCard) {
      if (this.openedCard.value === card.value) {
        this.sounds.success.play();
        this.openedCard = null;

        ++this.openedCardsCount;
      } else {
        this.openedCard.close();
        this.openedCard = card;
      }
    } else {
      this.openedCard = card;
    }

    const cardPairs = this.cards.length / 2;
    card.open(() => {
      if (this.openedCardsCount === cardPairs) {
        this.sounds.complete.play();
        this.restart();
      }
    });
  }

  initCardsPositions() {
    const positions = [];

    const cardPadding = 4;
    const cardTexture = this.textures.get("card").getSourceImage();

    const cardWidth = cardTexture.width + cardPadding;
    const cardHeight = cardTexture.height + cardPadding;

    const offsetX =
      (this.sys.game.config.width - cardWidth * config.cols) / 2 +
      cardWidth / 2;
    const offsetY =
      (this.sys.game.config.height - cardHeight * config.rows) / 2 +
      cardHeight / 2;

    let delay = 0;

    for (let row = 0; row < 2; row++) {
      for (let column = 0; column < 5; column++) {
        positions.push({
          delay: ++delay * 100,
          x: offsetX + column * cardWidth,
          y: offsetY + row * cardHeight,
        });
      }
    }
    this.positions = positions;
  }
}
