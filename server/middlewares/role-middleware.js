const jwt = require("jsonwebtoken");

module.exports = function (roleRequired) {
  return function (req, res, next) {
    if (req.method === "OPTIONS") {
      next();
    }
    try {
      const token = req.headers.authorization.split(" ")[1];
      console.log(token);
      if (!token) {
        return res.status(403).json({ message: "Пользователь не авторизован" });
      }
      const { role } = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      console.log(role);
      if (role == roleRequired) {
        next();
      } else {
        res.status(403).json({
          message: "Доступ запрещен. У пользователя недостаточно прав.",
        });
      }
    } catch (error) {
      return res.status(403).json({ message: "Пользователь не авторизован" });
    }
  };
};
