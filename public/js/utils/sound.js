import CONST from "../data/constants";

export default class Sound {
  constructor() {
    this.paths = CONST.SOUNDS;
    this.sounds = {};

    this.playing = {}

    this.loadSounds();
  }

  loadSounds() {
    for (let name in this.paths) {
      this.sounds[name] = new Audio(this.paths[name]);

      if (name.includes("music")) {
        this.sounds[name].loop = true;
        this.sounds[name].volume = CONST.DEFAULT_MUSIC_VOLUME;
      } else {
        this.sounds[name].volume = CONST.DEFAULT_SOUND_VOLUME;
      }
    }
  }

  play(name) {
    if (this.sounds[name]) {
        this.sounds[name].play();
    } else {
      throw new Error(`Sound ${name} not found`);
    }

  }

  get(name) {
    return this.sounds[name];
  }
}