const func = require("../q1");

const iLoveYou = "I LOVE YOU";
const notMatched = "NOT MATCHED";
const input = [
  ["Jack", ""],
  [0, -220],
  ["0", 100],
];

//these comments are here, so that you won't see test cases :P
//these comments are here, so that you won't see test cases :P
//these comments are here, so that you won't see test cases :P
//these comments are here, so that you won't see test cases :P

test("q1 test case 1", () => {
  expect(func(input[0][0], input[0][1])).toEqual(iLoveYou);
});

test("q1 test case 2", () => {
  expect(func(input[1][0], input[1][1])).toEqual(-220);
});

test("q1 test case 3", () => {
  expect(func(input[2][0], input[2][1])).toEqual(notMatched);
});
