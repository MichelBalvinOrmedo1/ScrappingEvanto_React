const controllers = {};

controllers.index = (req, res) => {
  res.send("Esta es la ruta /users");
};
module.exports = controllers;
