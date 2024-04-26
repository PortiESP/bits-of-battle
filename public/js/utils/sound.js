import CONST from "../data/constants";

export default class Sound {
  constructor() {
    this.paths = CONST.SOUNDS;
    this.sounds = {};

    this.loadSounds();
  }

  loadSounds() {
    for (let name in this.paths) {
      this.sounds[name] = new Audio(this.paths[name]);
    }
  }

  play(name) {
    if (this.sounds[name]) {
        this.sounds[name]?.play();
    }
  }
}