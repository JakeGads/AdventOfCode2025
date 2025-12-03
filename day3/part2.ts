import fs from 'fs';

const filepath = 'data/day3.real';

const data = fs.readFileSync(filepath, 'utf-8').trim().replaceAll('\r', '').split('\n');
const sampleResults = ["987654321111", "811111111119", "434234234278", "888911112111"]
// Function to generate the largest possible number by dropping individual chars

export class ArrayIndex {
    num: number;
    index: number;

    constructor(num: number, index: number){
        this.num = num;
        this.index = index;
    }
}

function getLargestNumber(digits: number[]){
    // find highest possible digit that maintains 
    let result = '';
    for(let i = 12; i != 0; i--){
        const slice = digits.slice(0, digits.length - i + 1);
        const largest = getLargestSlice(slice);
        result += `${largest.num}`;
        // console.log("Before slice:", digits.toString(), "\tSelected", largest.num);
        digits = digits.slice(largest.index + 1);
        
    }
    return result;
}

function getLargestSlice(array: number[]): ArrayIndex{
    let maxDigit = 0;
    let maxDigitIndex = 0;
    
    for (let i = 0; i < array.length; i++) {
        if (array[i] > maxDigit) {
            maxDigit = array[i];
            maxDigitIndex = i;
        }
    }

    return new ArrayIndex(maxDigit, maxDigitIndex);
}

let total = 0;
if (data.length === sampleResults.length){
    data.forEach((i, index) => {
        const array = i.split('').map(Number);
        const output = getLargestNumber(array);
        console.table({
            input: i, 
            output: output,  
            expected: sampleResults[index],
            output_length: output.length,
            correct_length: sampleResults[index].length,
            equal: output === sampleResults[index]
        });
        total += parseInt(output, 10);
    });
    console.log(`Sample total: ${total}, correct ${total === 3121910778619}`);
}
else {
    data.forEach(i=> {
        const array = i.split('').map(Number);
        const output = getLargestNumber(array);
        total += parseInt(output, 10);
    });
    console.log(total);
}