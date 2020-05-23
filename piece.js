class Piece {
  x;
  y;
  color;
  shape;
  ctx;
  typeId;
  hardDropped;

  constructor(ctx) {
    this.ctx = ctx;
    this.spawn();
  }

  move(position) {
    this.x = position.x;
    this.y = position.y;
  }

  randomizeTetrominoType(noOfTypes) {
    return Math.floor(Math.random() * noOfTypes + 1);
  }

  setStartingPosition() {
    this.x = this.typeId === 4 ? 4 : 3;
  }

  spawn() {
    this.typeId = this.randomizeTetrominoType(COLORS.length - 1);
    this.shape = SHAPES[this.typeId];
    this.color = COLORS[this.typeId];
    this.x = 0;
    this.y = 0;
    this.hardDropped = false;
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
