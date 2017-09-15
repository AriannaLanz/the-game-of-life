/**
 * Given a width and height, construct a Board.
 * 
 * @param {Int} width 
 * @param {Int} height 
 * @param {Array<Int>} cells the array to use for the cells (default: new Uint8Array(width * height))
 */
function Board(width=32, height=32, cells) {
  this.width = width
  this.height = height
  // We'll store our cells in a 1D typed array.
  // Typed arrays are a lot like normal arrays, but they're
  // (1) much faster, and (2) can only hold one kind of data type.
  // In this case, we're creating a Uint8 typed array, which means
  // it can only hold unsigned, 8-bit integers (ints from 0 to 255).
  //
  // Since we only really need to track 1 bit per cell, this is positively
  // luxurious for our needs.
  this.cells = cells || new Uint8Array(width * height)
}

/**
 * indexFor(coords: [row: int, col: int]) -> int
 * 
 * Given an array of coordinates [row, col], return the index of that cell in this
 * board's cells array.
 */
Board.prototype.indexFor = function([row, col]) {
  // OMG, a destructured parameter! ⬆️⬆️⬆️⬆️⬆️⬆️
  //
  // This digs into the array we were passed, plucks out the first
  // two elements, and names them row and col. Any other elements
  // are ignored.
  //
  // http://2ality.com/2015/01/es6-destructuring.html  
  
  // Return undefined if we're out of bounds
  if (row < 0 || row >= this.height || col < 0 || col >= this.width)
    return  
  return row * this.width + col
}

/**
 * get(coords: [row: int, col: int]) -> uint8
 * 
 * Get the value of the board at coords.
 */
Board.prototype.get = function (coords) {
  return this.cells[this.indexFor(coords)] || 0
}

/**
 * set(coords: [row: int, col: int], value: uint8)
 * 
 * Set the value of the board at coords to value.
 */
Board.prototype.set = function(coords, value) {
  // TODO
  this.cells[this.indexFor(coords)] = value; 
}

/**
 * livingNeighbors(coords: [row: int, col: int])
 * 
 * Return the count of living neighbors around a given coordinate.
 */
Board.prototype.livingNeighbors = function([row, col]) {
  // TODO: Return the count of living neighbors.

  //find neighbors


  var sum1 = this.get([row + 1, col]) + this.get([row - 1, col]) + this.get([row, col + 1]) + this.get([row, col - 1]);
  var sum2 = this.get([row + 1, col + 1]) + this.get([row - 1, col+1]) + this.get([row + 1, col - 1]) + this.get([row -1, col - 1]);
  
  return sum1 + sum2;
  



}

/**
 * toggle(coords: [row: int, col: int])
 * 
 * Toggle the cell at coords from alive to dead or vice versa.
 */
Board.prototype.toggle = function(coords) {
  // TODO
  if (this.get(coords) === 0) {
    this.set(coords, 1);
  } else if (this.get(coords) === 1){
    this.set(coords, 0);
  }
}

/**
 * Give the vitals of a cell (its current state, and how many living neighbors it
 * currently has), return whether it will be alive in the next tick. 
 * 
 * @param {Boolean} isAlive 
 * @param {Number} numLivingNeighbors 
 */
function conway(isAlive, numLivingNeighbors) {

  if(isAlive && (numLivingNeighbors === 2 || numLivingNeighbors== 3)) {
    return true;
  }

  if (isAlive === false && numLivingNeighbors === 3) {
    return true;
  }

  return false; 

}

/**
 * Given a present board, a future board, and a rule set, apply
 * the rules to the present and modify the future.
 * 
 * @param {Board} present 
 * @param {Board!} future (is mutated)
 * @param {(Boolean, Int) -> Boolean} rules (default: conway)
 */
function tick(present, future, rules=conway) {

for (var i = 0; i  < present.height; i++) {
  for (var j = 0; j < present.width; j++) {

      var alive_present = false;
      if(present.get([i,j])=== 1) {
        alive_present = true;  
      }
      var liveNeighbors = present.livingNeighbors([i,j]);
       
      if (rules(alive_present, liveNeighbors)){
        future.toggle([i, j]);
      }
  }
}
  return [future, present];
}
