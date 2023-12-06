const { log } = require('console');
var fs = require('fs');

const openPuzzleInput = () => {
    return fs.readFileSync('./puzzle_input.txt', 'utf8');
};

const main = () => {
    const lines = openPuzzleInput().split('\n');

    let part1 = 0, part2 = 0;
    const cardInstances = new Array(lines.length).fill(1);

    lines.forEach((line, idx) => {
        const [, winning, card] = line.split(/[:|]/g);
        const winningNums = winning.trim().split(/\s+/).map(Number);
        const cardNums = card.trim().split(/\s+/).map(Number);
        const matchCount = cardNums.filter((num) => winningNums.includes(num)).length;

        if (matchCount) {
            const points = 2 ** (matchCount - 1);
            part1 += points;

            for (let i = idx + 1; i <= idx + matchCount; i++) {
                cardInstances[i] += cardInstances[idx];
            }
        }
    });

    part2 = cardInstances.reduce((accumulate, card) => accumulate + card, 0);
    console.log(part1, part2);
};


main();
