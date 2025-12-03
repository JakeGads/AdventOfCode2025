import fs from 'fs';
const filepath = 'data/day3.real';

const data = fs.readFileSync(filepath, 'utf-8').trim().replaceAll('\r', '').split('\n');

class ArrayIndex {
    num: number;
    index: number;

    constructor(num: number, index: number){
        this.num = num;
        this.index = index;
    }
}

class Row {
    numbers: number[];
    constructor(numbers: string) {
        this.numbers = numbers.split('').map(Number);
    }

    find_largest_digit(array: number[]): ArrayIndex {
        let maxDigit = -1;
        let maxDigitIndex = -1;
        
        for (let i = 0; i < array.length; i++) {
            if (array[i] > maxDigit) {
                maxDigit = array[i];
                maxDigitIndex = i;
            }
        }

        return new ArrayIndex(maxDigit, maxDigitIndex);
    }

    calculate(): number {
        // start by finding the largest digit in range n-1 where n is length of numbers
        const left = this.find_largest_digit(this.numbers.slice(0, this.numbers.length - 1));
        const right = this.find_largest_digit(this.numbers.slice(left.index + 1));
        return parseInt('' + left.num + right.num, 10);
    }
}

let total = 0;
data.forEach((line) => {
    const row = new Row(line);
    const temp = row.calculate()
    total += temp;
    // console.log(`Line: ${line} => ${temp}`);
});

console.log(total);