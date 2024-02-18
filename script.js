var app = new Vue({
  el: "#app",
  data: {
    round: 1,
    level: 1000, //1.5c 1c 0.4c
    isPressed1: false,
    isPressed2: false,
    isPressed3: false,
    isPressed4: false,
    sequence: [],
    clickedArr: [],
    boardDisabled: true,
    btnDisabled: false,
    step: 0,
    gameOverText: false,
  },
  methods: {
    pressItem(id) {
      let sound = `https://s3.amazonaws.com/freecodecamp/simonSound${id}.mp3`;
      var audio = new Audio(sound);
      audio.play();

      const propertyName = `isPressed${id}`;
      this[propertyName] = true;
      setTimeout(() => {
        this[propertyName] = false;
      }, 200);
    },
    startRound() {
      this.gameOverText = false;
      this.btnDisabled = true;
      setTimeout(() => {
        this.genetareRound();
        this.playRound();
      }, 900);
    },
    genetareRound() {
      for (let i = 0; i < this.round; i++) {
        let randNumber = Math.floor(Math.random() * 4) + 1;
        this.sequence.push(randNumber);
      }
      console.log(this.sequence);
    },

    playIteration(i) {
      this.pressItem(this.sequence[i]);
      if (i === this.sequence.length - 1) {
        this.startFetching();
      } else {
        setTimeout(() => this.playIteration(i + 1), this.level);
      }
    },

    playRound() {
      this.playIteration(0);
    },

    startFetching() {
      this.boardDisabled = false;
      this.step = 1;
    },
    stopRound() {
      this.boardDisabled = true;
      this.sequence = [];
      this.clickedArr = [];
    },
    gameOver() {
      this.stopRound();
      this.gameOverText = true;
      this.round = 1;
      this.btnDisabled = false;
    },
    checkClick(id) {
      this.clickedArr.push(id);
      if (this.clickedArr[this.step - 1] === this.sequence[this.step - 1]) {
        this.step += 1;
      } else {
        this.gameOver();
      }
      if (this.clickedArr.length === this.round) {
        this.stopRound();
        this.startRound();
        setTimeout(() => (this.round += 1), 400);
      }
      console.log(this.clickedArr);
    },
  },
});
