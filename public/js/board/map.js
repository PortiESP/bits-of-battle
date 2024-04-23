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
        { row: 1, col: 1, type: "speed" },
        { row: 5, col: 13, type: "teleport" },
    ],
    objectives: [
        { row: 3, col: 5 },
        { row: 9, col: 20 },
        { row: 9, col: 7 },
        { row: 18, col: 19 },
    ],
}
