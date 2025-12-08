import fs from 'fs';
const filepath = 'data/day6.real';

class Calculation {
    values: number[];
    operation: string;

    constructor(values: string[]){
        this.values = values.slice(0, -1).map(v => parseInt(v, 10));
        this.operation = values[values.length - 1];
    }

    doMath(): number {
        if (this.operation === '+') {
            return this.values.reduce((a, b) => a + b, 0);
        } else if (this.operation === '*') {
            return this.values.reduce((a, b) => a * b, 1);
        } else {
            throw new Error(`Unknown operation: ${this.operation}`);
        }
    }
}

const data: string[][] = fs.readFileSync(filepath, 'utf-8').trim().replaceAll('\r', '').replaceAll('  ', ' ').split('\n').map(block => block.split(' '));
let total = 0;
// remove empty strings from data
for(let outer = 0; outer < data.length; outer += 1) {
    for (let inner = 0; inner < data[outer].length; inner += 1) {
        if (data[outer][inner] === '') {
            data[outer].splice(inner, 1);
            inner -= 1;
        }
    }
}

// transpose data
for (let inner = 0; inner < data[0].length; inner += 1) {
    let arr = [];
    for (let outer = 0; outer < data.length; outer += 1) {
        arr.push(data[outer][inner]);
    }
    const calc = new Calculation(arr);
    total += calc.doMath();
}

console.log(total);