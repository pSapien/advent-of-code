const fs = require("fs").promises;

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

const toDec = (bin) => parseInt(bin, 2);

function o2Priority(bitsIdx) {
  if (bitsIdx[0].length > bitsIdx[1].length) return bitsIdx[0];
  return bitsIdx[1];
}

function co2Priority(bitsIdx) {
  if (bitsIdx[1].length > bitsIdx[0].length) return bitsIdx[0];
  if (bitsIdx[0].length > bitsIdx[1].length) return bitsIdx[1];
  return bitsIdx[0];
}

function getRating(bits, priorityBits, cursor = 0) {
  if (bits.length === 1) return toDec(bits[0]);

  const bitsIdx = [[], []];

  bits
    .map((b) => b[cursor])
    .forEach((leadingBit, idx) => bitsIdx[leadingBit].push(idx));

  const commonBits = priorityBits(bitsIdx);
  const nextBits = bits.filter((_, idx) => commonBits.includes(idx));

  return getRating(nextBits, priorityBits, cursor + 1);
}

function solutionFn(bits) {
  return getRating(bits, o2Priority) * getRating(bits, co2Priority);
}

//solutionFn(test);

async function main() {
  const fileBlob = await fs.readFile("./day3-data.txt", "utf8");
  const answer = solutionFn(fileBlob.split("\n"));

  console.log(answer);
  return answer;
}

main(); // 4636702
