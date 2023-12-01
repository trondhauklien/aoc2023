import { Day } from "../day";

class Day1 extends Day {
  constructor() {
    super(1);
  }

  findFirstNumber(chars: Array<string>): string {
    let output = chars.find((char) => {
      let num = Number(char);
      return !Number.isNaN(num);
    });
    if (!output) {
      throw new Error("No number found");
    }
    return output;
  }

  replaceDigits(s: string): string {
    const digits = [
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight",
      "nine",
    ];
    let output = s;
    const regex = new RegExp(
      `(one|two|three|four|five|six|seven|eight|nine)`
    );
    const m = regex.exec(output);
    if (m) {
      const subst = `${digits.indexOf(m[1]) + 1}$&`;
      output = output.replace(regex, subst);
    }
    return output;
  }

  reverseReplaceDigits(s: string): string {
    const digits = [
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight",
      "nine",
    ];
    let output = s;
    const regex = new RegExp(
      `(one|two|three|four|five|six|seven|eight|nine)`,
    );
    let i = output.length - 1;
    while (i >= 0) {
      let substring = output.slice(i, output.length);
      const m = regex.exec(substring);
      if (m) {
        const subst = `$&${digits.indexOf(m[1]) + 1}`;
        substring = substring.replace(regex, subst);
        output = output.slice(0, i) + substring;
        return output;
      }
      i--;
    }
    return output;
  }

  solveForPartOne(input: string): string {
    var total = 0;
    let parts = input.split("\r\n");
    parts.forEach((part, index) => {
      console.log(`Part ${index}: ${part}`);
      let chars = [...part];
      let concat = "";
      concat += this.findFirstNumber(chars);
      chars.reverse();
      concat += this.findFirstNumber(chars);
      total += Number(concat);
    });
    return `${total}`;
  }

  solveForPartTwo(input: string): string {
    var total = 0;
    let parts = input.split("\r\n");
    parts.forEach((part, index) => {
      part = this.replaceDigits(part);
      part = this.reverseReplaceDigits(part);
      console.log(`Part ${index}: ${part}`);
      let chars = [...part];
      let concat = "";
      concat += this.findFirstNumber(chars);
      chars.reverse();
      concat += this.findFirstNumber(chars);
      total += Number(concat);
    });
    return `${total}`;
  }
}

export default new Day1();
