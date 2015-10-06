(function () {
  window.SG = window.SG || {};

  var View = SG.View = function ($el) {
    this.$el = $el;

    this.board = new SG.Board(17);
    this.setupGrid();

    this.intervalId = window.setInterval(
      this.step.bind(this),
      View.STEP_MILLIS
    );

    $(window).on("keydown", this.handleKeyEvent.bind(this));
  };

  View.KEYS = {
    38: "N",
    39: "E",
    40: "S",
    37: "W"
  };

  View.STEP_MILLIS = 160;

  View.prototype.handleKeyEvent = function (event) {
    event.preventDefault();
    if (View.KEYS[event.keyCode]) {
      this.board.snake.turn(View.KEYS[event.keyCode]);
    }
  };

  View.prototype.render = function () {
    this.updateClasses(this.board.snake.segments, "snake");
    this.updateClasses(this.board.snake.segments.slice(-1), "snake-head");
    this.updateClasses([this.board.apple.position], "apple");
  };

  View.prototype.updateClasses = function(coords, className) {
    if (className === "snake-head") {
      // this.$li.filter("." + className).removeClass();
      this.$li.filter(".snake-head-N").removeClass();
      this.$li.filter(".snake-head-S").removeClass();
      this.$li.filter(".snake-head-E").removeClass();
      this.$li.filter(".snake-head-W").removeClass();

      coords.forEach(function(coord){
        var flatCoord = (coord.i * this.board.dim) + coord.j;
        switch (this.board.snake.dir) {
          case "N":
            this.$li.eq(flatCoord).addClass("snake-head-N");
            break;
          case "S":
            this.$li.eq(flatCoord).addClass("snake-head-S");
            break;
          case "E":
            this.$li.eq(flatCoord).addClass("snake-head-E");
            break;
          case "W":
            this.$li.eq(flatCoord).addClass("snake-head-W");
            break;
        }
      }.bind(this));

    } else {
      this.$li.filter("." + className).removeClass();

      coords.forEach(function(coord){
        var flatCoord = (coord.i * this.board.dim) + coord.j;
        this.$li.eq(flatCoord).addClass(className);
      }.bind(this));
    }
  };

  View.prototype.setupGrid = function () {
    var html = "";

    for (var i = 0; i < this.board.dim; i++) {
      html += "<ul>";
      for (var j = 0; j < this.board.dim; j++) {
        html += "<li></li>";
      }
      html += "</ul>";
    }

    this.$el.html(html);
    this.$li = this.$el.find("li");
  };

  View.prototype.step = function () {
    if (this.board.snake.segments.length > 0) {
      this.board.snake.move();
      this.render();
    } else {
      window.clearInterval(this.intervalId);
      $('.again-div').removeClass('invisible');
      $('.again').click(this.playAgain.bind(this));
    }
  };

  View.prototype.playAgain = function (e) {
    e.preventDefault();
    $('.again-div').addClass('invisible')
    new SG.View($(".snake-game"));
  };
})();
