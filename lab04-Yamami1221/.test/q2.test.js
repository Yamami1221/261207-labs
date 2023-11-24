const func = require("../q2");

const input = [[-1, 2, 3], [1, 0, 9, 8, 7, 6, 5], []];

const output = ["-123", "1098765", ""];

//these comments are here, so that you won't see test cases :P
//these comments are here, so that you won't see test cases :P
//these comments are here, so that you won't see test cases :P
//these comments are here, so that you won't see test cases :P

test("q2 test case 1", () => {
  expect(func(input[0])).toEqual(output[0]);
});

test("q2 test case 2", () => {
  expect(func(input[1])).toEqual(output[1]);
});

test("q2 test case 3", () => {
  expect(func(input[2])).toEqual(output[2]);
});
