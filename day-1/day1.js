const fs = require("fs").promises;

async function main() {
  const fileBlob = await fs.readFile("./day1-data.txt", "utf8");
  const arr = fileBlob.split("\n");

  let increasedCount = 0;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i + 3] === undefined) break;

    if (Number(arr[i + 3]) > Number(arr[i])) increasedCount++;
  }

  console.log(increasedCount);
}

main(); // 1311
