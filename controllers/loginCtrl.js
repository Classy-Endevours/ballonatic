const fs = require("fs"); // used later to read in JSON files
const { validationResult } = require("express-validator");

const getUsers = () => {
  try {
    const buffer = fs.readFileSync("./data/balloonatic-users.json");
    const jsonObject = JSON.parse(buffer);
    return [...jsonObject]; // works fine to copy simple arrays
  } catch (err) {
    if (err.code === "ENOENT") {
      console.error("File not found!");
      return [];
    } else {
      throw err; // could be other error too
    }
  }
};

const checkLogin = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash("error", errors.errors[0].msg);
    res.redirect("/login");
    return;
  }
  const { email, password } = req.body;
  const allUsers = getUsers();
  const currentUser = allUsers.find(
    (user) => user.email === email && user.password === password
  );
  if (!currentUser) {
    req.flash("error", "Username or password incorrect");
    res.redirect("/login");
    return;
  }
  res.redirect("/");
};
module.exports = {
  checkLogin,
};
