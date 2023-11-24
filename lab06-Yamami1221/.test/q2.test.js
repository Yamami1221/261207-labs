const func = require("../q2");

const input4 = 177;
const output4 = {
  owner: "Glenna Reichert",
  title: "et placeat temporibus voluptas est tempora quos quibusdam",
  completed: false,
};

const input5 = 0;
const output5 = "INVALID TODO ID";

test("q2 case 1", () => {
  return func(input4).then((result) => {
    expect(result).toEqual(output4);
  });
});

test("q2 case 2", () => {
  return func(input5).then((result) => {
    expect(result).toEqual(output5);
  });
});
