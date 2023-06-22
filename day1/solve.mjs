import { readIntegersFromFile } from "../helpers.mjs"
const data = readIntegersFromFile("./input.txt")
const part1 = data.reduce((acc, cur, idx, arr) => {
    return cur > arr[idx - 1 > 0 ? idx - 1 : 0] ? acc + 1 : acc
}, 0)

console.log("Part 1:", part1)

let part2 = 0

for (let i = 0; i < data.length - 4; i += 1) {
    const curr = data[i]
    const next = data.at(i + 3)

    if (next > curr) {
        part2 += 1
    }
}

console.log("Part 2:", part2)
