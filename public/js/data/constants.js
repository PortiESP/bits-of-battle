import createWall from "../power_ups/wall.js"
import createSpark from "../power_ups/spark.js"

const canvasWidth = 960
const canvasHeight = 640
const cellSize = 32

/**
 * Constants used in the game
 */
const CONST = {
    // Canvas
    CANVAS_WIDTH: canvasWidth, // The width of the canvas
    CANVAS_HEIGHT: canvasHeight, // The height of the canvas,
    CELL_SIZE: cellSize, // The size of the cells in the canvas
    CHARACTER_SPRITE_SIZE: 64, // The size of the character sprite
    CHARACTER_CELL_RATIO: 2, // The ratio between the character sprite and the cell size

    // Game
    PLAYER_1_INITIAL: { x: cellSize + cellSize / 2, y: cellSize + cellSize / 2 }, // Initial position of player 1
    PLAYER_2_INITIAL: { x: canvasWidth - cellSize - cellSize / 2, y: canvasHeight - cellSize - cellSize / 2 }, // Initial position of player 2
    PLAYER_1_CHARACTER: "ninja", // Character of player 1
    PLAYER_2_CHARACTER: "dragon", // Character of player 2

    // Board & Style
    BACKGROUND_COLOR: "#FAF7F5",
    BOARD_COLOR: "#222",
    TEAM_1_COLOR: "#FD665C",
    TEAM_2_COLOR: "#AAD1D9",
    CANVAS_WINDOW_RATIO: 0.9, // % of the window size
    CANVAS_ASPECT_RATIO: 0.4, // The height will be the x% of the width
    FLAG_ZONE_COLOR: "#fff2", // Flag zone color when not owned

    // Ranges
    BASE_RADIUS_ATTACK: 60, // The player will attack players within this range
    BASE_RADIUS_DETECTION: 200, // The player will detect players within this range

    // Player
    BASE_PLAYER_SIZE: 30, // The player's size at the start of the game
    BASE_SPEED_PLAYER: 3, // The player's speed at the start of the game
    BASE_ACCELERATION_PLAYER: 0.05, // The player's acceleration factor
    BASE_BRAKE_PLAYER: 1.5, // The player's break factor (the higher the value, the faster the player will stop)
    PLAYER_ATTACK_MULTIPLIER: 0.05, // The player's attack multiplier
    PLAYER_ATTACK_CHANCE: 0.4, // The player's attack chance
    PLAYER_ORBIT_SPEED: 0.02, // The player's orbit speed
    PLAYER_ORBIT_SPEED_VARIATION: 0.02, // The player's orbit speed
    PLAYER_ORBIT_RADIUS: 200, // Player's orbit radius
    PLAYER_ORBIT_SCALE: 3, // Player's orbit scale
    PARTICLE_TARGET_SIZE: 5, // Particle target size
    PARTICLE_BLINK_FREQUENCY: 0.05, // Particle "blinking" ratio
    PARTICLE_SHIFT: 1, // Particle shift coefficient with respect to the player
    PARTICLE_UPDATE_DELAY: 50, // The delay between particle updates
    DEBOUNCER_DISTANCE: 10, // A threshold of the distance apart of the player's target where the player will stop moving
    CONTROLS_P1: { up: "w", down: "s", left: "a", right: "d" }, // Player 1 controls
    CONTROLS_P2: { up: "arrowup", down: "arrowdown", left: "arrowleft", right: "arrowright" }, // Player 2 controls

    // Objectives
    MAIN_OBJECTIVE_SIZE: 100, // The size of the main objective
    OBJECTIVE_SIZE: 40, // The size of the other objectives
    OBJECTIVE_PROGRESS_STEP: 1, // The progress step of the objectives
    OBJECTIVE_MAX_PROGRESS: 100, // The maximum progress of the objectives

    // POWERUPS
    POWERUPS_FUNCTIONS: {
        spark: createSpark,
    },
}

export default CONST
