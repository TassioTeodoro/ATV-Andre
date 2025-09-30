const express = require("express");
const router = express.Router();
const userController = require("../controllers/usercontroller");

// Rota para exibir o formulário
router.get("/", userController.getForm);

// Rota para cadastrar usuário
router.post("/add", userController.addUser);

// Rota para listar usuários
router.get("/list", userController.listUsers);

module.exports = router;
