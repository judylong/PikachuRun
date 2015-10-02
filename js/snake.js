(function () {
  window.SG = window.SG || {};

  var Snake = SG.Snake = function (board) {
    this.dir = "N";
    this.turning = false;
    this.board = board;

    var center = new SG.Coord(Math.floor(board.dim/2), Math.floor(board.dim/2));
    this.segments = [center];

    this.growTurns = 0;
  };

  Snake.DIFFS = {
    "N": new SG.Coord(-1, 0),
    "E": new SG.Coord(0, 1),
    "S": new SG.Coord(1, 0),
    "W": new SG.Coord(0, -1)
  };

  Snake.SYMBOL = "S";
  Snake.GROW_TURNS = 1;

  Snake.prototype.eatApple = function () {
    if (this.head().equals(this.board.apple.position)) {
      this.growTurns += 1;
      return true;
    } else {
      return false;
    }
  };

  Snake.prototype.isOccupying = function (array) {
    var result = false;
    this.segments.forEach(function (segment) {
      if (segment.i === array[0] && segment.j === array[1]) {
        result = true;
        return result;
      }
    });
    return result;
  };

  Snake.prototype.head = function () {
    return this.segments[this.segments.length - 1];
  };

  Snake.prototype.isValid = function () {
    var head = this.head();

    if (!this.board.validPosition(this.head())) {
      return false;
    }

    for (var i = 0; i < this.segments.length - 1; i++) {
      if (this.segments[i].equals(head)) {
        return false;
      }
    }

    return true;
  };

  Snake.prototype.move = function () {
    this.segments.push(this.head().plus(Snake.DIFFS[this.dir]));

    this.turning = false;

    if (this.eatApple()) {
      this.board.apple.replace();
    }

    if (this.growTurns > 0) {
      this.growTurns -= 1;
    } else {
      this.segments.shift();
    }

    if (!this.isValid()) {
      this.segments = [];
    }
  };

  Snake.prototype.turn = function (dir) {
    if (Snake.DIFFS[this.dir].isOpposite(Snake.DIFFS[dir]) ||
      this.turning) {
      return;
    } else {
      this.turning = true;
      this.dir = dir;
    }
  };

})();
