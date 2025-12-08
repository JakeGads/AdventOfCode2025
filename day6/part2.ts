import fs from 'fs';
const filepath = 'data/day6.sample';

function transposeArray(array: string[][]): string[][] {
    // 1. Handle edge cases (empty or non-rectangular array)
    if (!array || array.length === 0 || array[0].length === 0) {
        return [];
    }

    const numRows = array.length;         // The number of arrays in the outer array
    const numCols = array[0].length;      // The length of the inner arrays (assuming a rectangular structure)

    // 2. Initialize the result array. Its dimensions are numCols x numRows.
    const transposed: string[][] = [];
    for (let j = 0; j < numCols; j++) {
        // We create 'numCols' number of rows, each initially an empty array
        transposed.push([]); 
    }

    // 3. Iterate over the original array and swap indices (i, j) -> (j, i)
    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            // The value at array[i][j] (row i, column j) 
            // is placed at transposed[j][i] (row j, column i)
            transposed[j][i] = array[i][j];
        }
    }

    return transposed;
}

class Calculation {
    values: number[];
    operation: string;
    shouldBe: number[] = [];

    constructor(input: string[], shouldBe: number[] = []) {
        if(shouldBe.length > 0) {
            this.shouldBe = shouldBe.sort((a, b) => a - b);
        }

        this.operation = input[input.length - 1];
        // remove operation cause things are about to get funcky
        input.pop();
        this.values = input.map(val => parseInt(val, 10));
        // add preceding 0's to values to make them all the same length
        let longest = this.values.map(val => val.toString().length).reduce((a, b) => Math.max(a, b), 0);
        for(let i = 0; i < input.length; i += 1) {
            if (input[i].length < longest) {
                let diff = longest - input[i].length;
                input[i] = ' '.repeat(diff) + input[i];
            }
        }
        let transposable = transposeArray(input.map(val => val.split('')));
        this.values = [];
        for (let i = 0; i < transposable.length; i += 1) {
            let numStr = transposable[i].join('').trim();
            this.values.push(parseInt(numStr, 10));
        }
        
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

    verify_arryay(): boolean{
        console.log("Expecting:", this.shouldBe.sort((a, b) => a - b).toString());
        console.log("Got:", this.values.sort((a, b) => a - b).toString());
        console.log("-".repeat(20));
        return this.shouldBe.sort((a, b) => a - b).toString() === this.values.sort((a, b) => a - b).toString();
    }
}

console.log("-".repeat(20));
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

const shouldBes = [
    [356, 24, 1],
    [8, 248, 369],
    [175, 581, 32],
    [4, 432, 24],
    [4, 431, 36]
]
// transpose data
for (let inner = 0; inner < data[0].length; inner += 1) {
    let arr = [];
    for (let outer = 0; outer < data.length; outer += 1) {
        arr.push(data[outer][inner]);
    }
    const calc = new Calculation(arr, shouldBes[inner]);
    calc.verify_arryay();
}

console.log(total);