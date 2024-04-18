/**
 * Constants used in the game
 */
const CONST = {
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
    PLAYER_ATTACK_MULTIPLIER: 0.05, // The player's attack multiplier
    PLAYER_ATTACK_CHANCE: 0.4, // The player's attack chance
    PLAYER_ORBIT_SPEED: 1, // The player's orbit speed
    PARTICLE_UPDATE_DELAY: 50, // The delay between particle updates
    DEBOUNCER_DISTANCE: 10, // A threshold of the distance apart of the player's target where the player will stop moving
    CONTROLS_P1: { up: "w", down: "s", left: "a", right: "d" }, // Player 1 controls
    CONTROLS_P2: { up: "arrowup", down: "arrowdown", left: "arrowleft", right: "arrowright" }, // Player 2 controls

    // Objectives
    MAIN_OBJECTIVE_SIZE: 100, // The size of the main objective
    OBJECTIVE_SIZE: 50, // The size of the other objectives
    OBJECTIVE_PROGRESS_STEP: 1, // The progress step of the objectives
    OBJECTIVE_MAX_PROGRESS: 100, // The maximum progress of the objectives
}

export default CONST
