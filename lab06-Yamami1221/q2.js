const axios = require("axios");

const getTodo = async (todoId) => {
  try {
    const res = await axios.get(`https://jsonplaceholder.typicode.com/todos/${todoId}`);
    const { userId, title, completed } = res.data;
    const user = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
    const { name } = user.data;
    const result = {
      owner: name,
      title: title,
      completed: completed,
    };
    return result;
  } catch (err) {
    return 'INVALID TODO ID';
  }
};

//test case
const input1 = 15;
const input2 = 60;
const input3 = 250;

//run
getTodo(input1).then((result) => console.log(result));
getTodo(input2).then((result) => console.log(result));
getTodo(input3).then((result) => console.log(result));

module.exports = getTodo;
