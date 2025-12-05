import fs from 'fs';
const filepath = 'data/day5.real';

class Range{
    left: number;
    right: number;

    constructor(rangeStr: string) {
        const parts = rangeStr.split('-');
        this.left = parseInt(parts[0], 10);
        this.right = parseInt(parts[1], 10);
    }

    contains(value: number): boolean {
        return value >= this.left && value <= this.right;
    }
}

const data = fs.readFileSync(filepath, 'utf-8').trim().replaceAll('\r', '').split('\n\n').map(block => block.split('\n'));
const ranges = data[0].map(line => new Range(line)).sort((a, b) => a.left - b.left);
const items = data[1].map(line => parseInt(line, 10));

let total = 0;
for (const item of items) {    
    for (const range of ranges) {
        if (range.contains(item)) {
            total++;
            break;
        }
    }
}
// sample data should yield 3
console.log(total);