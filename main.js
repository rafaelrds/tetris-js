const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");
let requestId;
let time;

// Calculate size of canvas from constants.
ctx.canvas.width = COLS * BLOCK_SIZE;
ctx.canvas.height = ROWS * BLOCK_SIZE;

// Scale blocks
ctx.scale(BLOCK_SIZE, BLOCK_SIZE);

moves = {
  [KEY.LEFT]: (p) => ({ ...p, x: p.x - 1 }),
  [KEY.RIGHT]: (p) => ({ ...p, x: p.x + 1 }),
  [KEY.DOWN]: (p) => ({ ...p, y: p.y + 1 }),
  [KEY.SPACE]: (p) => ({ ...p, y: p.y + 1 }),
  [KEY.UP]: (p) => board.rotate(p),
};

let board = new Board();

function play() {
  addEventListener();
  resetGame();

  let piece = new Piece(ctx);
  piece.draw();

  // If we have an old game running a game then cancel the old
  if (requestId) {
    cancelAnimationFrame(requestId);
  }

  board.piece = piece;

  animate();
}

function resetGame() {
  board.reset();
  time = { start: 0, elapsed: 0 };
}

function animate(now = 0) {
  time.elapsed = now - time.start;
  if (time.elapsed > time.level) {
    time.start = now;
  }

  // Clear board before drawing new state.
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  board.draw();
  requestId = requestAnimationFrame(animate);
}

function addEventListener() {
  document.addEventListener("keydown", (event) => {
    if (moves[event.keyCode]) {
      // Stop the event from bubbling.
      event.preventDefault();

      // Get new state of piece
      let p = moves[event.keyCode](board.piece);

      if (event.keyCode === KEY.SPACE) {
        // Hard drop
        while (board.valid(p)) {
          board.piece.move(p);
          p = moves[KEY.DOWN](board.piece);
        }
      } else if (board.valid(p)) {
        // If the move is valid, move the piece.
        board.piece.move(p);
      }

      // Clear old position before drawing.
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      board.piece.draw();
    }
  });
}
