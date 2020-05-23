class Board {
  grid;
  piece;
  requestId;

  // Reset the board when we start a new game.
  reset() {
    this.grid = this.getEmptyBoard();
  }

  // Get matrix filled with zeros.
  getEmptyBoard() {
    return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
  }

  rotate(piece) {
    // Clone with JSON for immutability
    let p = Object.assign({}, piece);

    // Transpose matrix, p is the Piece (rotation)
    for (let y = 0; y < p.shape.length; ++y) {
      for (let x = 0; x < y; ++x) {
        [p.shape[x][y], p.shape[y][x]] = [p.shape[y][x], p.shape[x][y]];
      }
    }

    // Reverse the order of the columns.
    p.shape.forEach((row) => row.reverse());

    return p;
  }

  valid(p) {
    return p.shape.every((row, dy) => {
      return row.every((value, dx) => {
        let x = p.x + dx;
        let y = p.y + dy;
        return (
          this.isEmpty(value) ||
          (this.insideWalls(x) && this.aboveFloor(y) && this.notOccupied(x, y))
        );
      });
    });
  }

  draw() {
    this.piece.draw();
    this.drawBoard();
  }

  drawBoard() {
    this.grid.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0) {
          this.ctx.fillStyle = COLORS[value];
          this.ctx.fillRect(x, y, 1, 1);
        }
      });
    });
  }

  isEmpty(value) {
    return value === 0;
  }

  insideWalls(x) {
    return x >= 0 && x < COLS;
  }

  aboveFloor(y) {
    return y <= ROWS;
  }

  notOccupied(x, y) {
    return this.grid[y] && this.grid[y][x] === 0;
  }
}
