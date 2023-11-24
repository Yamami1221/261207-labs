const func = require("../q3");
const input = [7, 8, 19, 20];

const yes = "YES";
const no = "NO";

//these comments are here, so that you won't see test cases :P
//these comments are here, so that you won't see test cases :P
//these comments are here, so that you won't see test cases :P
//these comments are here, so that you won't see test cases :P

test("q3 test case 1", () => {
  expect(func(input[0])).toEqual(yes);
});

test("q3 test case 2", () => {
  expect(func(input[1])).toEqual(no);
});

test("q3 test case 3", () => {
  expect(func(input[2])).toEqual(yes);
});

test("q3 test case 4", () => {
  expect(func(input[3])).toEqual(no);
});
