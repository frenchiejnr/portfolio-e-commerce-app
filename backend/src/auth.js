const users = require("./db/users");

const register = async (data) => {
  const { username } = data;
  try {
    const user = await users.findUserByUsername(username);
    if (user) {
      throw new Error("User already exists");
    }
    return users.createUser(data);
  } catch (err) {
    throw new Error(err);
  }
};
const login = async (data) => {
  const { username, password } = data;

  try {
    const user = await users.findUserByUsername(username);

    if (!user) {
      throw new Error("Incorrect username or password.");
    }
    if (user.password !== password) {
      throw new Error("Incorrect username or password.");
    }
    return user;
  } catch (err) {
    throw new Error(err);
  }
};
module.exports = {
  register,
  login,
};
