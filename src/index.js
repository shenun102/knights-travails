/*
Break down problem:

Find the shortest path for a knight on a chessboard from a starting square to an ending square.
Knight moves in L-shape:
2 squares in one direction and one square to either side
1 square in on direction and two squares to either side

Representing the chessboard
8x8 grid where each cell can be represented by coordinates [x,y] where 0 <= x,y <= 8

Knight can move to 8 possible positions from any given cell
(x+2,y+1)
(x+2,y−1)
(x−2,y+1)
(x−2,y−1)
(x+1,y+2)
(x+1,y−2)
(x−1,y+2)
(x−1,y−2)
​

Breadth-First-Search is ideal for this problem because it explores all possible moves level by level and guarantees finding the shortest path in an unweighted graph

Use a queue to manage the cells to explore.
Use a set to track visited cells to avoid revisits.
For each cell, check all possible knight moves.
If a move leads to the target cell, return the path.
Otherwise, continue exploring until all possible paths are exhausted.
Track the Path:

Use a dictionary to keep track of the parent of each cell. This helps in reconstructing the shortest path once the target cell is reached.
*/

function knightMoves(start, end) {
  // Define all possible knight moves
  const moves = [
    [2, 1],
    [2, -1],
    [-2, 1],
    [-2, -1],
    [1, 2],
    [1, -2],
    [-1, 2],
    [-1, -2],
  ];

  // Helper function to check if a position after a move is valid
  function isMoveValid(x, y) {
    return x >= 0 && x < 8 && y >= 0 && y < 8;
  }

  // Implement Breadth-First-Search function to find shortest path
  function breadthFirstSearch(start, end) {
    // Initialize queue with starting position. The BFS function will use the queue to expore nodes level by level
    let queue = [start];
    // Track visited nodes with a set this avoids revisiting the same position, ensuring efficiendcy and avoiding infinite loops.
    let visited = new Set();
    visited.add(start.toString());
    // Track the parent of each node with map
    let parent = new Map();
    parent.set(start.toString(), null);

    // loop through queue until it is empty
    while (queue.length > 0) {
      // Extract first position and get its coordinates
      let current = queue.shift();
      let [x, y] = current;
      // If current position matches the end position stop loop as path has been found
      if (current[0] === end[0] && current[1] === end[1]) {
        break;
      }

      // For each possible move, calculate the new position, check if the move is valid and if the position has not been visited before, add new position to visited set and record its parent in the parent map and enqueue it for further exploration
      for (let [dx, dy] of moves) {
        let nextX = x + dx;
        let nextY = y + dy;
        if (isMoveValid(nextX, nextY)) {
          let nextPos = [nextX, nextY];
          if (!visited.has(nextPos.toString())) {
            visited.add(nextPos.toString());
            parent.set(nextPos.toString(), current);
            queue.push(nextPos);
          }
        }
      }
    }

    // Reconstruct the path
    let path = [];
    let step = end;
    while (step) {
      path.push(step);
      step = parent.get(step.toString());
    }
    return path.reverse(); // Return reversed path
  }

  // Find shortest path with BFS
  let path = breadthFirstSearch(start, end);

  // Output the path
  console.log(`You made it in ${path.length - 1} moves! Here's your path:`);
  for (let pos of path) {
    console.log(`[${pos[0]}, ${pos[1]}]`);
  }
}

// Example usage
knightMoves([0, 0], [7, 7]);
knightMoves([0,0],[3,3])
