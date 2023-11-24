const func = require("../q1");

const input3 = 7;
const output3 = "Kurtis Weissnat";

const input4 = 0;
const output4 = "INVALID USER ID";

test("q1 case 1", () => {
  return func(input3).then((result) => {
    expect(result).toEqual(output3);
  });
});

test("q1 case 2", () => {
  return func(input4).then((result) => {
    expect(result).toEqual(output4);
  });
});
