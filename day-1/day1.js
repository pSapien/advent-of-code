const fs = require("fs").promises;

function solutionFn(arr) {
  let increasedCount = 0;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i + 3] === undefined) return increasedCount;

    if (Number(arr[i + 3]) > Number(arr[i])) increasedCount++;
  }

  return increasedCount;
}

async function main() {
  const fileBlob = await fs.readFile("./day1-data.txt", "utf8");
  const answer = solutionFn(fileBlob.split("\n"));

  console.log(answer);
  return answer;
}

main(); // 1311
