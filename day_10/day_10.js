const { log } = require('console');
var fs = require('fs');

const openPuzzleInput = () => {
    return fs.readFileSync('./puzzle_input.txt', 'utf8');
};

const walkThroughMaze = (maze, startCoords) => {
    let steps = 1;
    let [row, col] = startCoords;

    if (maze[row-1][col] === "F" || maze[row-1][col] === "7" || maze[row-1][col] === "|") {
        row = row-1
        dirOfMove = "N"
    } else if (maze[row][col+1] === "-" || maze[row][col+1] === "7" ||  maze[row][col+1] === "J") {
        col = col+1
        dirOfMove = "E"
    } else if (maze[row+1][col] === "|" || maze[row+1][col] === "L" || maze[row+1][col] === "J") {
        row = row+1
        dirOfMove = "S"
    }

    while(maze[row][col] !== 'S') {
        steps ++;

        switch(maze[row][col]) {
            case '|':
                if (dirOfMove === "S") {
                    row ++;
                } else if (dirOfMove === "N") {
                    row --;
                }
                break;
            case '-':
                if (dirOfMove === "E") {
                    col ++;
                } else if (dirOfMove === "W") {
                    col --;
                }
                break;
            case 'L':
                if (dirOfMove === "S") {
                    dirOfMove = "E"
                    col ++;
                } else if (dirOfMove === "W") {
                    dirOfMove = "N"
                    row --;
                }
                break;
            case 'J':
                if (dirOfMove === "S") {
                    dirOfMove = "W"
                    col --;
                } else if (dirOfMove === "E") {
                    dirOfMove = "N"
                    row --;
                }
                break;
            case '7':
                if (dirOfMove === "E") {
                    dirOfMove = "S"
                    row ++;
                } else if (dirOfMove === "N") {
                    dirOfMove = "W"
                    col --;
                }
                break;
            case 'F':
                if (dirOfMove === "W") {
                    dirOfMove = "S"
                    row ++;
                } else if (dirOfMove === "N") {
                    dirOfMove = "E"
                    col ++;
                }
                break;
        };
    }

    return steps;
};

const main = () => {
    const maze = openPuzzleInput().split('\n').map((line) => line.split(''));

    let startCoords = [];
    maze.forEach((row, x) => {
        row.forEach((col, y) => {
            if (col === 'S') {
                startCoords = [x, y];
            }
        });
    });

    const totalLoop = walkThroughMaze(maze, startCoords);
    const halfLoop = totalLoop / 2;


    log(halfLoop);
};

main();