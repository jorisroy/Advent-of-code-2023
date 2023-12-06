const { log } = require('console');
var fs = require('fs');

const openPuzzleInput = () => {
    return fs.readFileSync('./puzzle_input.txt', 'utf8');
};

const calculateAllWinningCombination = (races) => {
    let amountWinningCombinations = [];

    for (const race of races) {
        let speed = 0;
        let timeLeft = race.time;

        while (timeLeft > 0) {
            if (speed * timeLeft > race.distance) {
                race.winningCombinations += 1;
            }

            speed += 1;
            timeLeft--;
        }
    }
    return races;
};


const main = () => {
    const races = [
        {
            time: 48,
            distance: 296,
            winningCombinations: 0,
        },
        {
            time: 93,
            distance: 1928,
            winningCombinations: 0,
        },
        {
            time: 85,
            distance: 1236,
            winningCombinations: 0,
        },
        {
            time: 95,
            distance: 1391,
            winningCombinations: 0,
        },
    ];
    const part1Unsolved = calculateAllWinningCombination(races);
    const part1 = part1Unsolved.reduce((accumulate, race, index) => {
        if (index === 0) {
            return race.winningCombinations;
        }
        return accumulate * race.winningCombinations;
    }, 0);
    log(part1);

    const part2 = calculateAllWinningCombination([{
        time: 48938595,
        distance: 296192812361391,
        winningCombinations: 0,
    }])
    log(part2);
};


main();
