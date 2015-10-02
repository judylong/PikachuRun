(function() {
  window.SG = window.SG || {};
  var Apple = SG.Apple = function (board) {
    this.board = board;
    this.replace();
  };

  Apple.prototype.replace = function () {
    var x = Math.floor(Math.random() * this.board.dim);
    var y = Math.floor(Math.random() * this.board.dim);

    while (this.board.snake.isOccupying([x, y])) {
      x = Math.floor(Math.random() * this.board.dim);
      y = Math.floor(Math.random() * this.board.dim);
    }

    this.position = new SG.Coord(x, y);
  };
})();
