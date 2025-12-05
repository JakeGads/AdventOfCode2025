import fs from 'fs';
const filepath = 'data/day5.real';

class Range {
    left: number;
    right: number;

    constructor(input: string) {
        let [left, right] = input.split('-').map(part => parseInt(part, 10));
        this.left = left;
        this.right = right;
    }

    overlaps(other: Range): boolean {
        return this.left <= other.right && other.left <= this.right;
    }
}

const data = fs.readFileSync(filepath, 'utf-8').trim().replaceAll('\r', '').split('\n\n').map(block => block.split('\n'))[0].map(line => new Range(line)).sort((a, b) => a.left - b.left);
let merged_ranges: Range[] = [];
for (const range of data) {
    // console.log(`Processing range: ${range.left}-${range.right}`);
    let is_unique = true;
    for (let i = 0; i < merged_ranges.length; i++) {
        const merged_range = merged_ranges[i];
        
        if (range.overlaps(merged_range)) {
            // console.log(`Merging with existing range: ${merged_range.left}-${merged_range.right}`);
            merged_range.left = Math.min(merged_range.left, range.left);
            merged_range.right = Math.max(merged_range.right, range.right);
            is_unique = false;
            break;
        }
        
    }
    if (is_unique) {
        merged_ranges.push(range);
    }
}

console.log("\n\n")
// for (const range of merged_ranges) {
//     console.log(`${range.left}-${range.right}`);
// }


let count = 0;
for (let i = 0; i < merged_ranges.length; i++) {
    const current = merged_ranges[i];
    count += current.right - current.left + 1;
}
console.log(count);
console.log(count < 342241656553417);
// 342241656553417 incorrect too high range