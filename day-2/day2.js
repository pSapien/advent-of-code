const fs = require("fs").promises;

const test = [
  "forward 5",
  "down 5",
  "forward 8",
  "up 3",
  "down 8",
  "forward 2",
];

function solutionFn(movements) {
  let horizontal = 0;
  let depth = 0;
  let aim = 0;

  const increaseAim = (value) => (aim += value);
  const decreaseAim = (value) => (aim -= value);
  const multiplyDepth = (value) => (depth += aim * value);
  const increaseHorizontal = (value) => (horizontal += value);

  movements.forEach((movement) => {
    let [command, value] = movement.split(" ");
    value = Number(value);

    if (command === "forward") {
      increaseHorizontal(value);
      multiplyDepth(value);
    }

    if (command === "down") increaseAim(value);
    if (command === "up") decreaseAim(value);
  });

  return horizontal * depth;
}

async function main() {
  const fileBlob = await fs.readFile("./day2-data.txt", "utf8");
  const answer = solutionFn(fileBlob.split("\n"));

  console.log(answer);
  return answer;
}

main(); // 1488311643

console.log(solutionFn(test)); // 900
