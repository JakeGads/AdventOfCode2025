import fs from 'fs';
const filepath = 'data/day4.real';

const file = fs.readFileSync(filepath, 'utf-8').trim().replaceAll('\r', '').split('\n').map(line => line.split(''));

let total = 0;

function full_run(data: string[][] = file) {
    for (let i = 0; i < data.length; i += 1) {
        for (let j = 0; j < data[i].length; j += 1) {
            if (data[i][j] === '.' ) continue; // not a roll so we can ignore
            
            const adjacentCells = [
                [i - 1, j - 1], [i - 1, j], [i - 1, j + 1],
                [i, j - 1],                 [i, j + 1],
                [i + 1, j - 1], [i + 1, j], [i + 1, j + 1],
            ];

            let openCount = 0;
            for (const [x, y] of adjacentCells) {
                // check bounds
                if (x >= 0 && x < data.length && y >= 0 && y < data[i].length) {
                    if (data[x][y] === '.') {
                        // console.log(`Found open cell at (${x}, ${y}) adjacent to (${i}, ${j})`);
                        openCount += 1;
                    }
                } else {
                    // console.log(`Found open cell at (${x}, ${y}) adjacent to (${i}, ${j})`);
                    openCount += 1; // out of bounds counts as open
                }
                if(openCount >= 5) break;
            }
            if (openCount >= 5) {
                console.log(`Cell at (${i}, ${j}) has ${openCount} open adjacent cells`);
                data[i][j] = '.'; // mark as open for next runs
                total += 1;
            }
        }
    }
    return data;
}

let data = file;
let last_run = -1;
while (last_run !== total) {
    last_run = total;
    data = full_run(data);
}

console.log(total);