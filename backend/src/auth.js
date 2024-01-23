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
  console.log(data);
  try {
    const user = await users.findUserByUsername(username);
    if (!user) {
      return { error: "Incorrect username or password." };
    }
    if (user.password !== password) {
      return { error: "Incorrect username or password." };
    }
    return user;
  } catch (err) {
    console.error(err); // Log the error for debugging
    return { error: "Internal server error." }; // Generic error message for users
  }
};
module.exports = {
  register,
  login,
};