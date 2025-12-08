import fs from 'fs';
const filepath = 'data/day7.real';
let data: string[][] = fs.readFileSync(filepath, 'utf-8').trim().replaceAll('\r', '').split('\n').map(line => line.split(''));

interface Point {
    X_Location: number;
    Y_Location: number;
}


let points: Set<Point> = new Set<Point>();
points.add({Y_Location: 0, X_Location: data[0].indexOf("S")})
let LastNumberOfPoints = 0;
let splits = 0;
// console.log(data)
while(points.size != LastNumberOfPoints){
    for(const point of points){
        // check we are in a valid range
        if(point.Y_Location + 1 >= data.length){
            continue;
        }
        if(point.X_Location - 1 < 0){
            continue;
        }
        if(point.X_Location + 1 >= data[point.Y_Location].length){
            continue;
        }

        if(data[point.Y_Location + 1][point.X_Location] == "."){
            points.add({Y_Location: point.Y_Location + 1, X_Location: point.X_Location});
            data[point.Y_Location + 1][point.X_Location] = "|";
        }
        if(data[point.Y_Location + 1][point.X_Location] == "^"){
            points.add({Y_Location: point.Y_Location + 1, X_Location: point.X_Location - 1});
            points.add({Y_Location: point.Y_Location + 1, X_Location: point.X_Location + 1});
            data[point.Y_Location + 1][point.X_Location + 1] = "|";
            data[point.Y_Location + 1][point.X_Location - 1] = "|";
            splits += 1;
        }        
    }
    LastNumberOfPoints = points.size;
    // console.log(data.map(line => line.join('')).join('\n'), "\n\n", "-".repeat(20));
}

console.log(`Found ${splits} Taycon Splits!`);