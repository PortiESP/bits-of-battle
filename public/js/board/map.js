import CONST from "../data/constants"

const map = [
    ["W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W"],
    ["W", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "W", " ", " ", " ", " ", "W", " ", " ", " ", "W"],
    ["W", "W", "W", " ", "W", "W", "W", "W", "W", "W", "W", " ", "W", "W", "W", "W", "W", "W", " ", " ", "W", " ", "W", "W", " ", "W", " ", "W", " ", "W"],
    ["W", " ", " ", " ", "W", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "W", " ", " ", "W", " ", "W", "W", " ", " ", " ", "W", " ", "W"],
    ["W", " ", "W", "W", "W", " ", " ", " ", "W", " ", " ", " ", "W", "W", "W", "W", " ", "W", " ", " ", "W", " ", "W", "W", " ", "W", " ", "W", " ", "W"],
    ["W", " ", " ", " ", "W", "W", "W", " ", "W", " ", " ", " ", "W", " ", " ", "W", " ", "W", " ", " ", "W", " ", " ", " ", " ", "W", " ", "W", " ", "W"],
    ["W", " ", "1", " ", "W", " ", " ", " ", "W", " ", " ", " ", "W", " ", " ", "W", " ", " ", " ", " ", " ", " ", " ", " ", " ", "W", " ", "W", " ", "W"],
    ["W", "W", "W", "W", "W", "W", " ", "W", "W", "W", "W", " ", "W", " ", " ", "W", "W", "W", "W", "W", "W", "W", " ", "W", " ", "W", " ", "W", " ", "W"],
    ["W", " ", " ", " ", " ", " ", " ", " ", " ", " ", "W", " ", " ", " ", " ", "W", "W", " ", " ", " ", " ", " ", " ", "W", " ", "W", " ", "W", " ", "W"],
    ["W", " ", "W", " ", " ", " ", " ", " ", " ", " ", " ", " ", "W", " ", " ", " ", "W", "W", " ", " ", " ", " ", " ", "W", " ", "W", " ", "W", " ", "W"],
    ["W", " ", "W", " ", "W", "W", " ", " ", " ", " ", "W", " ", "W", "W", " ", " ", " ", "W", "W", " ", " ", " ", " ", "W", " ", "W", " ", "W", " ", "W"],
    ["W", " ", "W", " ", "W", " ", " ", "W", " ", " ", "W", " ", " ", "W", "W", " ", " ", " ", "W", "W", "W", "W", "W", "W", " ", "W", " ", "W", " ", "W"],
    ["W", " ", "W", " ", "W", " ", "W", "W", "W", " ", "W", " ", " ", " ", "W", "W", " ", " ", " ", "W", "W", " ", " ", " ", " ", "W", " ", "W", " ", "W"],
    ["W", " ", "W", " ", "W", " ", " ", "W", " ", " ", "W", " ", " ", " ", " ", "W", "W", " ", " ", " ", "W", " ", "W", "W", "W", "W", " ", "W", " ", "W"],
    ["W", " ", " ", " ", "W", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "W", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "W", " ", "W"],
    ["W", " ", "W", "W", "W", " ", "W", "W", "W", "W", "W", " ", "W", "W", "W", " ", "W", "W", "W", "W", "W", " ", "W", " ", "W", "W", " ", "W", " ", "W"],
    ["W", " ", " ", " ", "W", " ", " ", " ", " ", " ", " ", " ", "W", " ", " ", " ", "W", " ", " ", " ", " ", " ", "W", " ", " ", "W", " ", "W", " ", "W"],
    ["W", " ", " ", " ", "W", " ", "W", "W", "W", "W", "W", " ", "W", " ", "W", "W", "W", " ", "W", "W", "W", " ", "W", " ", " ", "W", " ", "W", " ", "W"],
    ["W", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "W", " ", " ", " ", "W", " ", " ", " ", " ", " ", "2", "W"],
    ["W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W"],
]

export const mapData = {
    pixelSize: CONST.CELL_SIZE,
    width: map[0].length,
    height: map.length,
    map: map,
    powerUps: [
        { type: "attack-boost", row: 4, col: 5 },
        { type: "attack-boost", row: 1, col: 21 },
        { type: "teleport", row: 1, col: 1, toRow: 18, toCol: 23 },
        { type: "heal", row: 13, col: 8 },
        { type: "heal", row: 5, col: 14 },
        { type: "heal", row: 10, col: 19 },
    ],
    objectives: [
        { row: 3, col: 5 },
        { row: 9, col: 20 },
        { row: 9, col: 7 },
        { row: 18, col: 19 },
    ],
}
