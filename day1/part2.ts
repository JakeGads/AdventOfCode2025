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

        // loop every step of the distance, to check passage of 0
        for (let i = 0; i < distance; i++) {
            switch (direction) {
                case 'R':
                    this.pos++;
                    break;
                case 'L':
                    this.pos--;
                    break;
            }

            // normalize position
            if(this.pos < 0) this.pos += 100;
            if(this.pos >= 100) this.pos -= 100;

            // check if we are at 0
            if (this.pos == 0) {
                this.zero_count++;
            }
        }
    }
}

const dail = new Dail();

data.forEach((line) => {
    dail.functionMove(line);
});

console.log(dail.zero_count);