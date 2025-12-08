// Helper interface for a 3D point (Junction Box)
interface Point {
    x: number;
    y: number;
    z: number;
}

// Helper interface for an edge (Connection)
interface Edge {
    u: number; // index of the first point
    v: number; // index of the second point
    distanceSq: number; // squared distance between u and v
}

/**
 * Disjoint Set Union (DSU) or Union-Find data structure.
 * This is used to keep track of the connected components (circuits).
 */
class DisjointSetUnion {
    private parent: number[];
    private size: number[];
    public numSets: number;

    constructor(n: number) {
        this.parent = Array.from({ length: n }, (_, i) => i);
        this.size = Array(n).fill(1);
        this.numSets = n;
    }

    find(i: number): number {
        if (this.parent[i] === i) {
            return i;
        }
        this.parent[i] = this.find(this.parent[i]);
        return this.parent[i];
    }

    unionSets(i: number, j: number): boolean {
        let rootI = this.find(i);
        let rootJ = this.find(j);

        if (rootI !== rootJ) {
            if (this.size[rootI] < this.size[rootJ]) {
                [rootI, rootJ] = [rootJ, rootI];
            }
            
            this.parent[rootJ] = rootI;
            this.size[rootI] += this.size[rootJ];
            this.numSets--;
            return true; // Successfully united two different sets
        }
        return false; // Already in the same set
    }

    getCircuitSizes(): number[] {
        const sizes: number[] = [];
        for (let i = 0; i < this.parent.length; i++) {
            if (this.parent[i] === i) {
                sizes.push(this.size[i]);
            }
        }
        return sizes;
    }

    isFullyConnected(): boolean {
        return this.numSets === 1;
    }
}

function getDistanceSq(p1: Point, p2: Point): number {
    const dx = p1.x - p2.x;
    const dy = p1.y - p2.y;
    const dz = p1.z - p2.z;
    return dx * dx + dy * dy + dz * dz;
}

function parseInput(input: string): Point[] {
    return input.trim().split('\n').map(line => {
        const [x, y, z] = line.split(',').map(Number);
        return { x, y, z };
    });
}

/**
 * Part 1: Finds the product of the sizes of the three largest circuits 
 * after making N shortest connections.
 */
function solvePart1(input: string, connectionsToMake: number, numLargestCircuits: number): number {
    const points = parseInput(input);
    const N = points.length;

    if (N < 2) return 0;

    const allEdges: Edge[] = [];
    for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
            const distanceSq = getDistanceSq(points[i], points[j]);
            allEdges.push({ u: i, v: j, distanceSq });
        }
    }

    allEdges.sort((a, b) => a.distanceSq - b.distanceSq);

    const dsu = new DisjointSetUnion(N);

    let edgesProcessed = 0;
    for (const edge of allEdges) {
        if (edgesProcessed >= connectionsToMake) {
            break;
        }
        dsu.unionSets(edge.u, edge.v);
        edgesProcessed++;
    }

    const circuitSizes = dsu.getCircuitSizes();
    circuitSizes.sort((a, b) => b - a);

    let product = 1;
    for (let i = 0; i < Math.min(numLargestCircuits, circuitSizes.length); i++) {
        product *= circuitSizes[i];
    }

    return product;
}

/**
 * Part 2: Continues connecting junction boxes until all are in one circuit.
 * Returns the product of the X coordinates of the last two junction boxes connected.
 */
function solvePart2(input: string): number {
    const points = parseInput(input);
    const N = points.length;

    if (N < 2) return 0;

    const allEdges: Edge[] = [];
    for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
            const distanceSq = getDistanceSq(points[i], points[j]);
            allEdges.push({ u: i, v: j, distanceSq });
        }
    }

    allEdges.sort((a, b) => a.distanceSq - b.distanceSq);

    const dsu = new DisjointSetUnion(N);

    let lastConnection: Edge | null = null;

    for (const edge of allEdges) {
        const wasUnited = dsu.unionSets(edge.u, edge.v);
        
        if (wasUnited) {
            lastConnection = edge;
            
            // Check if all junction boxes are now in one circuit
            if (dsu.isFullyConnected()) {
                break;
            }
        }
    }

    if (!lastConnection) {
        return 0; // Should never happen with valid input
    }

    // Return the product of the X coordinates of the last two connected junction boxes
    const x1 = points[lastConnection.u].x;
    const x2 = points[lastConnection.v].x;
    
    return x1 * x2;
}

import fs from 'fs';
const filepath = 'data/day8.real';

// Example input
const exampleInput = fs.readFileSync(filepath, 'utf8');

console.log("=== Part 1 ===");
const part1Result = solvePart1(exampleInput, 1000, 3);
console.log(`Product of the three largest circuit sizes after 10 connections: ${part1Result}`);
console.log("Expected: 40");

console.log("\n=== Part 2 ===");
const part2Result = solvePart2(exampleInput);
console.log(`Product of X coordinates of the last connection: ${part2Result}`);
console.log("Expected: 25272 (216 * 117)");

// Export functions for use in other modules
export { solvePart1, solvePart2, parseInput, DisjointSetUnion, getDistanceSq };
export type { Point, Edge };