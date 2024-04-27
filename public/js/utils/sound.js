import CONST from "../data/constants";

function loadMusicVol(){
  const vol = parseFloat(localStorage.getItem("musicVolume"))
  return vol === 0 || vol ? vol : CONST.DEFAULT_MUSIC_VOLUME
}

function loadSfxVol(){
  const vol = parseFloat(localStorage.getItem("sfxVolume"))
  return vol === 0 || vol ? vol : CONST.DEFAULT_SOUND_VOLUME
}

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
        this.sounds[name].volume = loadMusicVol();
      } else {
        this.sounds[name].volume = loadSfxVol();
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

  setVolume(name, volume) {

    if (this.sounds[name]) {
      this.sounds[name].volume = volume;
    } else {
      if (name === "music") {
        for (let sound in this.sounds) {
          if (sound.includes("music")) {
            this.sounds[sound].volume = volume;
          }
        }
      }
      else if (name === "sfx") {
        for (let sound in this.sounds) {
          if (!sound.includes("music")) {
            this.sounds[sound].volume = volume;
          }
        }
      } else {
        throw new Error(`Sound ${name} not found`);
      }
    }
  }
}