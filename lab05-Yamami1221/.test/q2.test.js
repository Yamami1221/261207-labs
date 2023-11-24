const func = require("../q2");

const inputs = [
  [
    { name: "b1", score: 10 },
    { name: "b2", score: 9 },
    { name: "b3", score: 8 },
  ],
  [
    { name: "a2", score: 6 },
    { name: "a3", score: 5 },
    { name: "a1", score: 10 },
  ],
];

const outputs = [["b1", "b2"], ["a1"]];

//these comments are here, so that you won't see test cases :P
//these comments are here, so that you won't see test cases :P
//these comments are here, so that you won't see test cases :P
//these comments are here, so that you won't see test cases :P

test("q2 test case 1", () => {
  expect(func(inputs[0]).sort()).toEqual(outputs[0].sort());
});

test("q2 test case 2", () => {
  expect(func(inputs[1]).sort()).toEqual(outputs[1].sort());
});
