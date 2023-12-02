import { Day } from "../day";

type TaskData = {
  group: number;
  red: number;
  green: number;
  blue: number;
};

type TaskStrings = keyof TaskData;

class Day2 extends Day {
  config = {
    red: 12,
    green: 13,
    blue: 14,
  };
  constructor() {
    super(2);
  }

  parseLine(input: string): TaskData {
    let [group, rest] = input.split(":");
    let td = {
      group: parseInt(group.replace("Game ", "")),
      red: 0,
      green: 0,
      blue: 0,
    };
    let sets = rest.split(";");
    sets.forEach((set, i) => {
      const colors = set.split(",");
      colors.forEach((color) => {
        const [count, key] = color.trim().split(" ");
        td[key as TaskStrings] = Math.max(
          td[key as TaskStrings],
          parseInt(count)
        );
      });
    });
    return td;
  }

  solveForPartOne(input: string): string {
    const rows = input.split("\n");
    let solution = rows.reduce((sol, row) => {
      const td = this.parseLine(row);
      console.log(td);
      if (
        td.red > this.config.red ||
        td.green > this.config.green ||
        td.blue > this.config.blue
      ) {
        return sol;
      }
      return sol + td.group;
    }, 0);
    return `${solution}`;
  }

  solveForPartTwo(input: string): string {
    const rows = input.split("\n");
    let solution = rows.reduce((sol, row) => {
      const td = this.parseLine(row);
      return sol + td.red * td.green * td.blue;
    }, 0);
    return `${solution}`;
  }
}

export default new Day2();
