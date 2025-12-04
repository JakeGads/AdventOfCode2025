import fs from 'fs';
const filepath = 'data/day4.real';

const data = fs.readFileSync(filepath, 'utf-8').trim().replaceAll('\r', '').split('\n').map(line => line.split(''));

let total = 0;
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
        }
        if (openCount >= 5) {
            console.log(`Cell at (${i}, ${j}) has ${openCount} open adjacent cells`);
            total += 1;
        }
    }
}   

console.log(total);