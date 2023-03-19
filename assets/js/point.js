export default class Point {
  constructor(x, y, size = 2) {
    this.x = x;
    this.y = y;
    this.size = size
  }

  copy() {
    return new Point(this.x, this.y, this.size)
  }

  compare(point){
    return this.x === point.x && this.y === point.y && this.size === point.size
  }
}