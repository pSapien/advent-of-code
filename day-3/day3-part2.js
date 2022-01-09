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

function getOxygenBitIdx(leadingBits) {
  const bitsIdx = [[], []];

  leadingBits.forEach((leadingBit, idx) => {
    bitsIdx[leadingBit].push(idx);
  });

  if (bitsIdx[0].length > bitsIdx[1].length) return bitsIdx[0];

  return bitsIdx[1];
}

function getCo2BitIdx(leadingBits) {
  const bitsIdx = [[], []];

  leadingBits.forEach((leadingBit, idx) => {
    bitsIdx[leadingBit].push(idx);
  });

  if (bitsIdx[1].length > bitsIdx[0].length) return bitsIdx[0];
  if (bitsIdx[0].length > bitsIdx[1].length) return bitsIdx[1];

  return bitsIdx[0];
}

function getCommonBits(bits, bitCommonIdx, cursor) {
  const firstCommonBits = bitCommonIdx(bits.map((b) => b[cursor]));
  return bits.filter((b, idx) => firstCommonBits.includes(idx));
}

function solutionFn(bits) {
  let oxyenBits = bits,
    oxyenCursor = 0;

  while (true) {
    if (oxyenBits.length === 1) break;

    oxyenBits = getCommonBits(oxyenBits, getOxygenBitIdx, oxyenCursor);
    oxyenCursor++;
  }

  let co2Bits = bits,
    co2Cursor = 0;

  while (true) {
    if (co2Bits.length === 1) break;

    co2Bits = getCommonBits(co2Bits, getCo2BitIdx, co2Cursor);
    co2Cursor++;
  }

  const answer = toDec(oxyenBits[0]) * toDec(co2Bits[0]);
  console.log(answer);
  return answer;
}

//solutionFn(test);

async function main() {
  const fileBlob = await fs.readFile("./day3-data.txt", "utf8");
  const answer = solutionFn(fileBlob.split("\n"));

  console.log(answer);
  return answer;
}

main();
