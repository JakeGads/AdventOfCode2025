import fs from 'fs';
const filepath = 'data/day1.real';

const data = fs.readFileSync(filepath, 'utf-8').trim().split('\n');

class Dail {
    pos: number;
    zero_count: number;
    constructor() {
        this.pos = 50;
        this.zero_count = 0;
    }

    functionMove(code: string) {
        // parse direction and distance
        let direction = code[0];
        let distance = parseInt(code.slice(1), 10);

        // move only that direction and distance
        switch (direction) {
            case 'R':
                this.pos += distance;
                break;
            case 'L':
                this.pos -= distance;
                break;
        }
        // wrap around the dial if out of bounds
        if(this.pos < 0) this.pos += 100;
        this.pos = this.pos % 100;
        
        // check if we are at 0
        if (this.pos == 0) {
            this.zero_count++;
        }
    }
}

const dail = new Dail();

data.forEach((line) => {
    dail.functionMove(line);
});

console.log(dail.zero_count);