import { count } from "console";
import { Day } from "../day";

interface Part {
  type: string;
  number: number[];
  row: number;
  col: number;
}
class Day3 extends Day {
  rows: string[] = [];
  matrix: string[][] = [];
  n: number = 0;
  m: number = 0;

  parts: Part[] = [];

  constructor() {
    super(3);
  }

  checkValid(row: number, col: number): boolean {
    return row >= 0 && row < this.n && col >= 0 && col < this.m;
  }

  checkNeighbours(
    row: number,
    col: number
  ): { isPartNumber: boolean; col: number; row: number } {
    const directions = [
      { row: -1, col: 0 },
      { row: -1, col: 1 },
      { row: 0, col: 1 },
      { row: 1, col: 1 },
      { row: 1, col: 0 },
      { row: 1, col: -1 },
      { row: 0, col: -1 },
      { row: -1, col: -1 },
    ];

    let oCol = 0;
    let oRow = 0;

    const isPartNumber = directions.some((direction) => {
      let newRow = row + direction.row;
      let newCol = col + direction.col;
      if (this.checkValid(newRow, newCol)) {
        let neighbour = this.matrix[newRow][newCol];
        if (!(neighbour == ".") && isNaN(Number(neighbour))) {
          oCol = newCol;
          oRow = newRow;
          return true;
        }
      }
      return false;
    });

    return { isPartNumber, col: oCol, row: oRow };
  }

  registerPart(number: number, row: number, col: number): void {
    console.log(`Part Number: ${number} ${row} ${col} is a gear`);
    let newparts = this.parts.map((part) => {
      if (part.row == row && part.col == col) {
        return { ...part, number: [...part.number, Number(number)] };
      }
      return part;
    });
    if (JSON.stringify(newparts) == JSON.stringify(this.parts)) {
      this.parts.push({
        type: "*",
        number: [Number(number)],
        row: row,
        col: col,
      });
    } else {
      this.parts = newparts;
    }
  }

  findNumber(
    value: string,
    row: number,
    col: number
  ): { number: number; length: number; isPartNumber: boolean } {
    let counter = 1;
    let numberString = value;
    let next = "";
    let { isPartNumber, col: pCol, row: pRow } = this.checkNeighbours(row, col);
    while (
      col + counter < this.m &&
      !isNaN(Number((next = this.matrix[row][col + counter])))
    ) {
      numberString += next;
      if (!isPartNumber) {
        ({ isPartNumber, col: pCol, row: pRow } = this.checkNeighbours(row, col + counter));
      }
      counter++;
    }
    
    let number = Number(numberString);
    if (isPartNumber && this.matrix[pRow][pCol] == "*") {
      this.registerPart(number, pRow, pCol);
    }
    console.log(`Number String: ${numberString} ${isPartNumber}`);
    return { number, length: counter, isPartNumber };
  }

  solveForPartOne(input: string): string {
    this.rows = input.split("\r\n");
    this.matrix = this.rows.map((row) => row.split(""));

    this.n = this.matrix.length;
    this.m = this.matrix[0].length;

    let sol = 0;

    for (let i = 0; i < this.n; i++) {
      for (let j = 0; j < this.m; j++) {
        let current = this.matrix[i][j];
        if (Number(current)) {
          let { number, length, isPartNumber } = this.findNumber(current, i, j);
          if (isPartNumber) {
            sol += number;
          }
          j += length - 1;
        }
      }
    }
    return `${sol}`;
  }

  solveForPartTwo(input: string): string {
    const sol = this.parts.reduce((acc, part) => {
      if (part.number.length == 2) {
        return acc + part.number[0] * part.number[1];
      }
      return acc;
    }, 0);
    return `${sol}`;
  }
}

export default new Day3();
