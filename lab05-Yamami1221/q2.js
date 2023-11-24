function findTopNames(students) {
  return students.filter((student) => student.score > 8).map((student) => student.name);
}

const students1 = [
  { name: "john", score: 10 },
  { name: "jane", score: 9 },
  { name: "jim", score: 8 },
];

console.log(findTopNames(students1));

module.exports = findTopNames;
