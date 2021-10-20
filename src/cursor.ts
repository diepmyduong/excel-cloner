export class Cursor {
  constructor(public row: number = 0, public col: number = 0) {}

  down(row: number = 1) {
    this.row += row;
    return this;
  }
  right(col: number = 1) {
    this.col += col;
    return this;
  }
  up(row: number = 1) {
    if (this.row > 0) this.row -= row;
    return this;
  }
  left(col: number = 1) {
    if (this.col > 0) this.col -= col;
    return this;
  }

  top() {
    this.row = 0;
    return this;
  }

  head() {
    this.col = 0;
    return this;
  }
}
