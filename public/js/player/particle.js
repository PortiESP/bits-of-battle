import CONST from "../data/constants.js"

export default class Particle {
    constructor(x, y, size, team) {
        this.position = { x, y }
        this.size = size
        this.offset = { x: 0, y: 0 }
        this.shift = { x, y }
        this.speed = CONST.PLAYER_ORBIT_SPEED + Math.random() * CONST.PLAYER_ORBIT_SPEED_VARIATION
        this.targetSize = CONST.PARTICLE_TARGET_SIZE
        this.fillColor = team
        this.orbit = (CONST.PLAYER_ORBIT_RADIUS / 3) * Math.random()
    }

    update(i, centerX, centerY, width, height) {
        this.offset.x += this.speed * 0.7
        this.offset.y += this.speed * 0.7
        this.shift.x += (centerX - this.shift.x) * this.speed * CONST.PARTICLE_SHIFT
        this.shift.y += (centerY - this.shift.y) * this.speed * CONST.PARTICLE_SHIFT
        this.position.x = this.shift.x + Math.cos(i + this.offset.x) * this.orbit * CONST.PLAYER_ORBIT_SCALE
        this.position.y = this.shift.y + Math.sin(i + this.offset.y) * this.orbit * CONST.PLAYER_ORBIT_SCALE
        this.position.x = Math.max(Math.min(this.position.x, width), 0)
        this.position.y = Math.max(Math.min(this.position.y, height), 0)
        this.size += (this.targetSize - this.size) * CONST.PARTICLE_BLINK_FREQUENCY

        if (Math.round(this.size) === Math.round(this.targetSize)) {
            this.targetSize = 1 + Math.random() * 10
        }
    }
}
