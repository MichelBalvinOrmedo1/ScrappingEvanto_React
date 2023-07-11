const express = require("express");
const controllers = require("../controllers/index.controllers.cjs");
const router = express.Router();

// Ruta para obtener información de usuarios
router.get("/", controllers.index);

module.exports = router;
