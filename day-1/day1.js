const fs = require('fs').promises;


async function main() {
  const fileBlob = await fs.readFile('./day1-data.txt', 'utf8');
  const arrayData = fileBlob.split('\n');

  console.log(increasedCountFinder(arrayData, 3))
}

main(); // 1311

const sum = (arr) => arr.reduce((acc, curr) => Number(acc) + Number(curr), 0);

function increasedCountFinder(arr, chunkSize) {
  let increasedCount = 0;

  for (let head = 0; head < arr.length; head++) {
    const tail = head + chunkSize;

    if (arr[tail] === undefined) break;

    const firtSum = sum(arr.slice(head, tail));
    const secondSum = sum(arr.slice(head + 1, tail + 1));

    if (secondSum > firtSum) increasedCount++;
  }

  return increasedCount
}
