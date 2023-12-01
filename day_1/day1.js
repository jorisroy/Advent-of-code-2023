const { log } = require('console');
var fs = require('fs');


const openPuzzleInput = () => {
    return fs.readFileSync('./puzzle_input.txt', 'utf8');
};

const main = () => {
    const file = openPuzzleInput();

    const lines = file.split('\n');
    const totalNumber = lines.reduce((currentCount, line) => {
        const numbers = parseNumbers(line).replace(/\D/g,'');

        if (numbers === '') {
            return currentCount;
        }
        const firstAndLastNumber = numbers.slice(0, 1) + numbers.slice(-1);

        return currentCount + parseInt(firstAndLastNumber);
    }, 0);

    console.log(totalNumber);
};

const parseNumbers = (line) => {
    let numbers1 = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

    const formattedLine = line.replace(/(one|two|three|four|five|six|seven|eight|nine)/g, (match) => {
        return numbers1.indexOf(match) + 1;
    });
    
    return formattedLine;
};


main();