class Triangle {
    constructor(ax, ay, bx, by, cx, cy, fill = () => noFill()) {
      this.vector = [createVector(ax, ay), createVector(bx, by) ,createVector(cx, cy)];
      this.fill = fill;
    }

    setFill(color){
        this.fill = () => fill(color);
    }

  }