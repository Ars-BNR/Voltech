const bcrypt = require("bcrypt");

const profile = [
  {
    id: "1",
    login: "admin",
    password: bcrypt.hashSync("admin", 3),
    role: "admin",
  },
];
module.exports = profile;
