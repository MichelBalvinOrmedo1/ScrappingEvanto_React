const express = require("express");
const { userController } = require("../../controllers/userController.cjs");

const router = express.Router();

// Ruta para obtener información de usuarios
router.get("/", userController);

module.exports = router;
