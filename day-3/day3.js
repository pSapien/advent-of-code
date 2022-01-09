const fs = require("fs").promises;

// find gama rate and epsilon rate
// multiply gama and epsilon rate
const test = [
  "00100",
  "11110",
  "10110",
  "10111",
  "10101",
  "01111",
  "00111",
  "11100",
  "10000",
  "11001",
  "00010",
  "01010",
];

function solutionFn(bits) {
  let currentCursor = 0;
  const firstBit = bits[0];
  let currentBitCalculation = [0, 0];

  let gama = "",
    epsilon = "";

  for (let i = 0; i < bits.length; i++) {
    const currentBit = bits[i][currentCursor];
    const nextBits = bits[i + 1];

    currentBitCalculation[currentBit] += 1;

    if (nextBits === undefined && currentCursor === firstBit.length) {
      break;
    }

    if (nextBits === undefined) {
      i = 0;

      if (currentBitCalculation[0] > currentBitCalculation[1]) {
        // zero is leading
        gama += "0";
        epsilon += "1";
      } else {
        // one is leading
        gama += "1";
        epsilon += "0";
      }

      currentBitCalculation = [0, 0];
      currentCursor++;

      continue;
    }
  }

  return toDec(gama) * toDec(epsilon);
}

const toDec = (bin) => parseInt(bin, 2);

// console.log(solutionFn(test));

async function main() {
  const fileBlob = await fs.readFile("./day3-data.txt", "utf8");
  const answer = solutionFn(fileBlob.split("\n"));

  console.log(answer);
  return answer;
}

main();
