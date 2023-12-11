const { log } = require('console');
var fs = require('fs');

const openPuzzleInput = () => {
    return fs.readFileSync('./puzzle_input.txt', 'utf8');
};

const main = () => {
    let lines = openPuzzleInput().split('\n').map(line => line.split(' ').map(Number));

    const total = lines.reduce((accumulation, line) => {
        const lastNumber = findLastNumber(line);
        return accumulation + lastNumber;
    }, 0);

    const totalReversed = lines.reduce((accumulation, line) => {
        const lastNumber = findLastNumber(line, true);
        return accumulation + lastNumber;
    }, 0);

    log(total);
    log(totalReversed);
}

const findLastNumber = (line, reverse = false) => {
    let allArrays = [line]
    const findNextNumber = (line) => {
        let nextNumber = [];

        for (let i = 1; i < line.length; i++) {
            nextNumber.push(line[i]-line[i-1])
        }

        allArrays.push(nextNumber)
        return nextNumber.join("") == 0 ? allArrays : findNextNumber(nextNumber)
    }
    findNextNumber(line); 

    if (reverse) {
        return allArrays.reverse().reduce((accumulation, arr) => arr[0] - accumulation, 0)
    }
    return allArrays.reduce((accumulation, arr) => accumulation+arr[arr.length-1], 0)
}

main();
