const { log } = require('console');
var fs = require('fs');

const openPuzzleInput = () => {
    return fs.readFileSync('./puzzle_input.txt', 'utf8');
};

const indexes = { red: 0, green: 1, blue: 2 };

const parseLine = (line) => {
    const [id, cubes] = line.split(":");
    return {
        id: id.match(/Game (\d+)/)[1],
        cubes: cubes.split(";").reduce((acc, handful) => {
        for (const cube of handful.split(",")) {
            const [, count, color] = cube.match(/(\d+) (red|green|blue)/);
            acc[indexes[color]] = Math.max(acc[indexes[color]], count);
        }
        return acc;
        }, Array(3).fill(0)),
    };
};

const sum = (items) => items.reduce((acc, x) => acc + x, 0);

const main = () => {
    const bag = [12, 13, 14];

    const lines = openPuzzleInput().split("\n");

    const mapedLines = lines.map(parseLine);
    const totals = sum(
        mapedLines
            .filter(({ cubes }) => bag.every((x, i) => cubes[i] <= x))
            .map(({ id }) => Number(id))
    );

    const levelTwo = () => sum(lines.map(parseLine).map(({ cubes }) => cubes.reduce((acc, x) => acc * x, 1)));
    log(levelTwo());
};

main();
