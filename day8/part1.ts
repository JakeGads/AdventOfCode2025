import fs from 'fs';
const filepath = 'data/day8.real';


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
    // 'parent' stores the parent of each element.
    private parent: number[];
    // 'size' stores the size of the set rooted at 'i'.
    private size: number[];
    // 'numSets' tracks the total number of distinct sets (circuits).
    public numSets: number;

    constructor(n: number) {
        this.parent = Array.from({ length: n }, (_, i) => i); // Each element is its own parent initially
        this.size = Array(n).fill(1); // Each set has size 1 initially
        this.numSets = n;
    }

    /**
     * Finds the representative (root) of the set containing element i.
     * Uses Path Compression for efficiency.
     */
    find(i: number): number {
        if (this.parent[i] === i) {
            return i;
        }
        // Path Compression: set parent[i] directly to the root
        this.parent[i] = this.find(this.parent[i]);
        return this.parent[i];
    }

    /**
     * Unites the sets containing elements i and j.
     * Uses Union by Size for efficiency.
     * Returns the new size of the merged set, or -1 if already united.
     */
    unionSets(i: number, j: number): number {
        let rootI = this.find(i);
        let rootJ = this.find(j);

        if (rootI !== rootJ) {
            // Union by Size: attach smaller set to the root of the larger set
            if (this.size[rootI] < this.size[rootJ]) {
                [rootI, rootJ] = [rootJ, rootI]; // Swap so rootI is the larger set
            }
            
            this.parent[rootJ] = rootI; // Make rootI the new parent
            this.size[rootI] += this.size[rootJ]; // Update size of the new set
            this.numSets--;
            return this.size[rootI];
        }
        // Already in the same set/circuit
        return -1;
    }

    /**
     * Returns an array of all current circuit sizes.
     */
    getCircuitSizes(): number[] {
        const sizes: number[] = [];
        for (let i = 0; i < this.parent.length; i++) {
            // Only consider the sizes of the roots of the sets
            if (this.parent[i] === i) {
                sizes.push(this.size[i]);
            }
        }
        return sizes;
    }
}

/**
 * Calculates the squared straight-line distance between two 3D points.
 * Using squared distance avoids a slow square root operation and is sufficient
 * for comparison purposes.
 */
function getDistanceSq(p1: Point, p2: Point): number {
    const dx = p1.x - p2.x;
    const dy = p1.y - p2.y;
    const dz = p1.z - p2.z;
    return dx * dx + dy * dy + dz * dz;
}

/**
 * Parses the raw input string into an array of Point objects.
 */
function parseInput(input: string): Point[] {
    return input.trim().split('\n').map(line => {
        const [x, y, z] = line.split(',').map(Number);
        return { x, y, z };
    });
}

/**
 * Solves the Playground problem:
 * Finds the product of the sizes of the three largest circuits after N shortest connections.
 */
function solvePlayground(input: string, connectionsToMake: number, numLargestCircuits: number): number {
    const points = parseInput(input);
    const N = points.length;

    if (N < 2) return 0;

    // 1. Calculate all possible edges
    const allEdges: Edge[] = [];
    for (let i = 0; i < N; i++) {
        // Start from i+1 to only calculate each pair once
        for (let j = i + 1; j < N; j++) {
            const distanceSq = getDistanceSq(points[i], points[j]);
            allEdges.push({ u: i, v: j, distanceSq });
        }
    }

    // 2. Sort all edges by distance (Kruskal's algorithm preparation)
    allEdges.sort((a, b) => a.distanceSq - b.distanceSq);

    // 3. Initialize Disjoint Set Union
    const dsu = new DisjointSetUnion(N);

    // 4. Process the shortest edges (attempt connections even if already connected)
    let edgesProcessed = 0;
    for (const edge of allEdges) {
        if (edgesProcessed >= connectionsToMake) {
            break;
        }
        
        // Attempt to connect the two junction boxes
        // This may fail if they're already in the same circuit, but we still count it
        dsu.unionSets(edge.u, edge.v);
        edgesProcessed++;
    }

    // 5. Get the sizes of all circuits
    const circuitSizes = dsu.getCircuitSizes();

    // 6. Find the 'numLargestCircuits' largest sizes
    // Sort in descending order to easily pick the largest
    circuitSizes.sort((a, b) => b - a);

    // Take the product of the sizes of the top 'numLargestCircuits' circuits
    // Ensure we don't try to access elements beyond the array length
    let product = 1;
    for (let i = 0; i < Math.min(numLargestCircuits, circuitSizes.length); i++) {
        product *= circuitSizes[i];
    }

    return product;
}

// Example input provided in the problem description
const exampleInput = fs.readFileSync(filepath, 'utf8');

// Run the example: 10 shortest connections, find product of 3 largest circuits
const result = solvePlayground(exampleInput, 1000, 3);
console.log(`Product of the three largest circuit sizes after 10 connections: ${result}`); // Expected: 40
