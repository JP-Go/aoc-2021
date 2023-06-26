import { readFileSync } from "node:fs";

const data = readFileSync("./input.txt", "utf8").split("\n").filter(Boolean);

function buildFrequencyMap(data) {
    return data.reduce((acc, cur) => {
        for (let i = 0; i < cur.length; i++) {
            if (!acc[i]) {
                acc[i] = {};
            }
            acc[i][cur[i]] ? acc[i][cur[i]]++ : (acc[i][cur[i]] = 1);
        }
        return acc;
    }, []);
}

function reduceToMostCommonBits(acc, cur) {
    return acc + (cur["1"] >= cur["0"] ? "1" : "0");
}

function reduceToLeastCommonBits(acc, cur) {
    return acc + (cur["1"] >= cur["0"] ? "0" : "1");
}

function bitFlip(byteString) {
    return byteString
        .split("")
        .map((b) => (b === "0" ? "1" : "0"))
        .join("");
}

const bitFrequencyMap = buildFrequencyMap(data);
const gammaRate = bitFrequencyMap.reduce(reduceToMostCommonBits, "");
const epsilonRate = bitFlip(gammaRate);
console.log("part1: ", parseInt(gammaRate, 2) * parseInt(epsilonRate, 2));

function filterByFrequencyWindow(data, bitFrequencyMapBuilder, reducer) {
    let result = [...data];
    let i = 0;
    while (result.length > 1) {
        const currentFrequencyMap = bitFrequencyMapBuilder(result);
        const currentMaskBit = currentFrequencyMap.reduce(reducer, "")[i];
        result = result.filter((byte) => byte[i] === currentMaskBit);
        ++i;
    }
    return result;
}

const o2rate = filterByFrequencyWindow(
    data,
    buildFrequencyMap,
    reduceToMostCommonBits
);
const co2rate = filterByFrequencyWindow(
    data,
    buildFrequencyMap,
    reduceToLeastCommonBits
);

const part2 = parseInt(o2rate, 2) * parseInt(co2rate, 2);
console.log("part 2:", part2);
