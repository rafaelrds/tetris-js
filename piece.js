class Piece {
  x;
  y;
  color;
  shape;
  ctx;

  constructor(ctx) {
    this.ctx = ctx;
    this.spawn();
  }

  move(p) {
    this.x = p.x;
    this.y = p.y;
  }

  randomizeTetrominoType(noOfTypes) {
    return Math.floor(Math.random() * noOfTypes);
  }

  spawn() {
    this.color = COLORS[this.randomizeTetrominoType(COLORS.length)];
    this.shape = SHAPES[this.randomizeTetrominoType(SHAPES.length)];

    // Starting position.
    this.x = 3;
    this.y = 0;
  }

  draw() {
    this.ctx.fillStyle = this.color;
    this.shape.forEach((row, pieceY) => {
      row.forEach((value, pieceX) => {
        // this.x, this.y gives the left upper position of the shape
        // x, y gives the position of the block in the shape
        // this.x + x is then the position of the block on the board
        if (value > 0) {
          this.ctx.fillRect(this.x + pieceX, this.y + pieceY, 1, 1);
        }
      });
    });
  }
}
