import CONST from "../data/constants.js"

function retrievePlayersUIElements() {
    // Retrieve players UI menu elements from player 1
    window.$health1 = document.getElementById("health-value1")
    window.$health1Img = document.getElementById("health-img1")

    window.$captured1 = document.getElementById("flags-value1")
    window.$captured1Img = document.getElementById("flags-img1")

    window.$attack1 = document.getElementById("attack-value1")
    window.$attack1Img = document.getElementById("attack-img1")

    // Retrieve players UI menu elements from player 2
    window.$health2 = document.getElementById("health-value2")
    window.$health2Img = document.getElementById("health-img2")

    window.$captured2 = document.getElementById("flags-value2")
    window.$captured2Img = document.getElementById("flags-img2")

    window.$attack2 = document.getElementById("attack-value2")
    window.$attack2Img = document.getElementById("attack-img2")
}

/**
 * Update the UI elements
*/
function updateUI() {
    // Update the health
    updateHealthUI()

    // Update the attack
    updateAttackUI()

    // Update the defense
    // updateDefenseUI()

    // Update the objectives
    updateObjectivesUI()   
}

/**
 * Update the player health
 */
function updateHealthUI() {
    // Update the health of the players
    updatePlayerDefaultUI(window.players[0].stats.health, CONST.MAX_PLAYER_HEALTH, $health1, $health1Img)
    updatePlayerDefaultUI(window.players[1].stats.health, CONST.MAX_PLAYER_HEALTH, $health2, $health2Img)
}

/** 
 * Update the player attack
*/
function updateAttackUI() {
    // Update the attack of the players
    updatePlayerDefaultUI(window.players[0].stats.attack, CONST.MAX_PLAYER_ATTACK, $attack1, $attack1Img)
    updatePlayerDefaultUI(window.players[1].stats.attack, CONST.MAX_PLAYER_ATTACK, $attack2, $attack2Img)
}

/**
 * Update the player default UI
*/
function updatePlayerDefaultUI(stat, maxValue, $element, $elementImg) {
    // Update the number
    $element.textContent = stat

    // Update the bar
    let multiplier = 0
    if (stat === maxValue) multiplier = 4
    else if (stat > maxValue * 0.5) multiplier = 3
    else if (stat > maxValue * 0.25) multiplier = 2
    else if (stat > 0) multiplier = 1
    else multiplier = 0

    $elementImg.style.backgroundPosition = `${-multiplier * CONST.UI_SIZE}px 0`
}

/** 
 * Update the player objectives
*/
function updateObjectivesUI() {
    // Update the objectives of the players
    const stat1 = window.board.objectives.filter((obj) => obj.team === CONST.TEAM_1_COLOR).length
    const stat2 = window.board.objectives.filter((obj) => obj.team === CONST.TEAM_2_COLOR).length
    updatePlayerDefaultUI(stat1, window.board.objectives.length, $captured1, $captured1Img)
    updatePlayerDefaultUI(stat2, window.board.objectives.length, $captured2, $captured2Img)
}

export { retrievePlayersUIElements, updateUI }