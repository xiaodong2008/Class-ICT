const pc = require("picocolors");
const iq = require("@inquirer/prompts");

main();
async function main() {
  console.log(
    `${pc.green("EasyMark System")} - ${pc.gray("Made by xiaodong2008")}
    
1. Calculate the avarage score of a student
2. Order students by score`
  );

  const choice = Number(
    await iq.input({
      message: "Please choose an option:",
      validate: (input) => {
        if (input < 1 || input > 2) {
          return "Please enter a valid number";
        }
        return true;
      },
    })
  );

  switch (choice) {
    case 1:
      await calculateAvarage();
      break;
    case 2:
      await orderStudents();
      break;
  }
}

async function calculateAvarage() {
  const scores = await iq.input({
    message: "Please enter the scores of the student:",
    validate: (input) => {
      const scores = input.split(",");
      for (const score of scores) {
        if (isNaN(score)) {
          return "Please enter a valid number";
        }
      }
      return true;
    },
  });

  const scoresArr = scores.split(",").map((score) => parseFloat(score));
  const sum = scoresArr.reduce((acc, score) => acc + score, 0);
  const avarage = sum / scoresArr.length;

  console.log(`The avarage score is: ${avarage}`);
}

async function orderStudents() {
  const students = await iq.input({
    message: "Please enter the students' names and scores:",
    validate: (input) => {
      const students = input.split(",");
      for (const student of students) {
        const [name, score] = student.split(":");
        if (!name || !score || isNaN(score)) {
          return "Please enter a valid name and score";
        }
      }
      return true;
    },
  });

  const studentsArr = students.split(",").map((student) => {
    const [name, score] = student.split(":").map((item) => item.trim());
    return { name, score: parseFloat(score) };
  });

  studentsArr.sort((a, b) => b.score - a.score);

  console.log("Students ordered by score:");
  studentsArr.forEach((student) => {
    console.log(`${student.name}: ${student.score}`);
  });
}
