const func = require("../q1");

const inputs = [
  [
    {
      items: ["poor man shield", "magic stick"],
      gold: 50,
    },
    {
      item: "vanguard",
      price: 10,
    },
  ],
  [
    {
      items: [],
      gold: 50,
    },
    {
      item: "bloodstone",
      price: 1000,
    },
  ],
];

const outputs = [
  {
    items: ["poor man shield", "magic stick", "vanguard"],
    gold: 40,
  },
  {
    items: [],
    gold: 50,
  },
];

//these comments are here, so that you won't see test cases :P
//these comments are here, so that you won't see test cases :P
//these comments are here, so that you won't see test cases :P
//these comments are here, so that you won't see test cases :P

test("q1 test case 1", () => {
  expect(func(inputs[0][0], inputs[0][1])).toEqual(outputs[0]);
});

test("q1 test case 2", () => {
  expect(func(inputs[1][0], inputs[1][1])).toEqual(outputs[1]);
});
