const cellSize = 32
const canvasMatrixSize = [30, 20]
const canvasWidth = canvasMatrixSize[0] * cellSize
const canvasHeight = canvasMatrixSize[1] * cellSize

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
    FRAME_RATE: 10, // The frame rate of the game
    WALL_ID: "W", // The id of the wall in the map
    OBJECTIVE_ID: "O", // The id of the objective in the map
    POWERUP_ID: "P", // The id of the powerup in the map
    PLAYER_1_ID: "1", // The id of player 1 in the map
    PLAYER_2_ID: "2", // The id of player 2 in the map

    // Game
    PLAYER_1_INITIAL: { x: cellSize + cellSize / 2, y: cellSize + cellSize / 2 }, // Initial position of player 1
    PLAYER_2_INITIAL: { x: canvasWidth - cellSize - cellSize / 2, y: canvasHeight - cellSize - cellSize / 2 }, // Initial position of player 2
    PLAYER_1_CHARACTER: "ninja", // Character of player 1
    PLAYER_2_CHARACTER: "dragon", // Character of player 2

    // Flags
    PLAYER_1_FLAG: "redFlag", // Flag of player 1
    PLAYER_2_FLAG: "blueFlag", // Flag of player 2
    DEFAULT_FLAG: "whiteFlag", // Default flag

    // Board & Style
    BACKGROUND_COLOR: "#FAF7F5",
    BOARD_COLOR: "#222",
    TEAM_1_COLOR: "#FD665C",
    TEAM_2_COLOR: "#AAD1D9",
    CANVAS_WINDOW_RATIO: 0.9, // % of the window size
    CANVAS_ASPECT_RATIO: 0.4, // The height will be the x% of the width
    FLAG_ZONE_COLOR: "#fff2", // Flag zone color when not owned

    // Ranges
    BASE_RADIUS_ATTACK: 32, // The player will attack players within this range
    BASE_RADIUS_DETECTION: 200, // The player will detect players within this range

    // Player
    BASE_PLAYER_ATTACK: 1, // The player's attack at the start of the game
    BASE_PLAYER_DEFENSE: 5, // The player's defense at the start of the game

    MAX_PLAYER_HEALTH: 100, // The player's maximum health
    MAX_PLAYER_ATTACK: 75, // The player's maximum attack
    MAX_PLAYER_DEFENSE: 50, // The player's maximum defense

    BASE_PLAYER_SIZE: 30, // The player's size at the start of the game
    BASE_SPEED_PLAYER: 1, // The player's speed at the start of the game
    BASE_ACCELERATION_PLAYER: 0.05, // The player's acceleration factor
    BASE_BRAKE_PLAYER: 1.5, // The player's break factor (the higher the value, the faster the player will stop)
    PLAYER_SIZE: 16, // Player's hitbox radius
    PLAYER_ATTACK_MULTIPLIER: 0.05, // The player's attack multiplier
    PLAYER_ATTACK_CHANCE: 0.4, // The player's attack chance
    PLAYER_ORBIT_SPEED: 0.02, // The player's orbit speed
    PLAYER_ORBIT_SPEED_VARIATION: 0.02, // The player's orbit speed
    PLAYER_ORBIT_RADIUS: 200, // Player's orbit radius
    PLAYER_ORBIT_SCALE: 3, // Player's orbit scale
    DEBOUNCER_DISTANCE: 10, // A threshold of the distance apart of the player's target where the player will stop moving
    CONTROLS_P1: { up: "w", down: "s", left: "a", right: "d" }, // Player 1 controls
    CONTROLS_P2: { up: "arrowup", down: "arrowdown", left: "arrowleft", right: "arrowright" }, // Player 2 controls

    // Objectives
    MAIN_OBJECTIVE_SIZE: 64, // The size of the main objective
    OBJECTIVE_SIZE: 16, // The size of the other objectives
    OBJECTIVE_PROGRESS_STEP: 1, // The progress step of the objectives
    OBJECTIVE_MAX_PROGRESS: 100, // The maximum progress of the objectives
}

export default CONST
