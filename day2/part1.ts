import fs from 'fs';
const filepath = 'data/day2.real';

const data = fs.readFileSync(filepath, 'utf-8').trim().split(',');
let invalidCount = 0;

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
        for (let i = this.min; i <= this.max; i++) {
            if (this.verify_value(i)) {
                console.log(`Invalid value: ${i}`);
                invalidCount += i;
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

console.log(invalidCount, invalidCount === 1227775554);