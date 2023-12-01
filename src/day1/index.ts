import { Day } from "../day";

class Day1 extends Day {
  digits = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]; //prettier-ignore
  constructor() {
    super(1);
  }

  findFirstNumber(chars: Array<string>): string {
    let output = chars.find((char) => {
      return !Number.isNaN(Number(char));
    });
    if (!output) {
      throw new Error("No number found");
    }
    return output;
  }

  replaceDigits(s: string): string {
    const regex = new RegExp(`(one|two|three|four|five|six|seven|eight|nine)`);
    const m = regex.exec(s);
    if (m) {
      const subst = `${this.digits.indexOf(m[1]) + 1}$&`;
      s = s.replace(regex, subst);
    }
    return s;
  }

  reverseReplaceDigits(s: string): string {
    const regex = new RegExp(`(one|two|three|four|five|six|seven|eight|nine)`);
    for (let i = s.length - 1; i >= 0; i--) {
      let substring = s.slice(i, s.length);
      const m = regex.exec(substring);
      if (m) {
        const subst = `$&${this.digits.indexOf(m[1]) + 1}`;
        return s.slice(0, i) + substring.replace(regex, subst);
      }
    }
    return s;
  }

  solveForPartOne(input: string): string {
    var total = 0;
    let parts = input.split("\r\n");
    parts.forEach((part) => {
      let chars = [...part];
      total += Number(
        this.findFirstNumber(chars) + this.findFirstNumber(chars.reverse())
      );
    });
    return `${total}`;
  }

  solveForPartTwo(input: string): string {
    var total = 0;
    let parts = input.split("\r\n");
    parts.forEach((part) => {
      part = this.replaceDigits(part);
      part = this.reverseReplaceDigits(part);
      let chars = [...part];
      total += Number(
        this.findFirstNumber(chars) + this.findFirstNumber(chars.reverse())
      );
    });
    return `${total}`;
  }
}

export default new Day1();
