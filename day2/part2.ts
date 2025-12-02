import fs from 'fs';
const filepath = 'data/day2.real';

const data = fs.readFileSync(filepath, 'utf-8').trim().split(',');
let invalidCount = 0;

function splitEveryNChars(str: string, n: number): string[] {
    const result: string[] = [];
    for (let i = 0; i < str.length; i += n) {
        result.push(str.slice(i, i + n));
    }
    return result;
}

class Range {
    min: number
    max: number
    constructor(min: number, max: number) {
        this.min = min;
        this.max = max;
    }

    check_range(): void {
        if (this.min > this.max) {
            console.log(`Invalid range: ${this.min}-${this.max}`);
            return;
        }
        // numbers
        for (let i = this.min; i <= this.max; i++) {
            const string = i.toString();
            // lengths
            for (let length = 1; length <= string.length / 2; length++) {
                // split every n chars, check if all are the same by using a set
                const parts = new Set(splitEveryNChars(string, length));
                if (parts.size === 1){
                    console.log(`Invalid value: ${i}`);
                    invalidCount += i;
                    break;
                }
                
            }
        }    
    }

    verify_value(value: number): boolean {
        const string = value.toString();
        const left = string.slice(0, string.length / 2);
        const right = string.slice(string.length / 2);
        return left === right;    
    }
}

data.forEach((line) => {
    let min = parseInt(line.split('-')[0], 10);
    let max = parseInt(line.split('-')[1], 10);
    const range = new Range(min, max);
    range.check_range();
});

console.table({invalidCount, isCorrect: invalidCount === 4174379265, isLessThanSample: invalidCount < 4174379265});