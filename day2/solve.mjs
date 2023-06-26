import { readFileSync } from "node:fs";

const opList1 = new Map();
opList1.set("forward", (tracker, value) => ({
    ...tracker,
    horizontal: tracker["horizontal"] + value,
}));
opList1.set("up", (tracker, value) => ({
    ...tracker,
    depth: tracker["depth"] - value,
}));
opList1.set("down", (tracker, value) => ({
    ...tracker,
    depth: tracker["depth"] + value,
}));

const data = readFileSync("./input.txt", "utf8")
    .split("\n")
    .map((a) => a.split(" "))
    .map((a) => [a[0], parseInt(a[1])])
    .slice(0, -1);

const calculateFinalPosition = (opList) => (acc, cur) =>
    opList.get(cur[0])(acc, cur[1]);

let finalPosition = data.reduce(calculateFinalPosition(opList1), {
    horizontal: 0,
    depth: 0,
});

let delta = (position) => position.horizontal * position.depth;

console.log("part1:", delta(finalPosition));

const opList2 = new Map();
opList2.set("forward", (tracker, value) => ({
    ...tracker,
    horizontal: tracker["horizontal"] + value,
    depth: tracker["depth"] + value * tracker["aim"],
}));
opList2.set("up", (tracker, value) => ({
    ...tracker,
    aim: tracker["aim"] - value,
}));
opList2.set("down", (tracker, value) => ({
    ...tracker,
    aim: tracker["aim"] + value,
}));

finalPosition = data.reduce(calculateFinalPosition(opList2), {
    horizontal: 0,
    depth: 0,
    aim: 0,
});

console.log("part2:", delta(finalPosition));
