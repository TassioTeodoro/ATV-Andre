const path = require("path");
const fs = require("fs");
const User = require("../models/usermodel");

exports.getForm = (req, res) => {
  res.sendFile("index.html", { root: "./views" });
};

exports.addUser = (req, res) => {
  const { nome, email } = req.body;
  User.addUser(nome, email);
  res.redirect("/list");
};

exports.listUsers = (req, res) => {
  const users = User.getAllUsers();

  const filePath = path.join(__dirname, "../views/list.html");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("Erro ao carregar página");
    }

    const lista = users
      .map((u) => `<li>${u.nome} - ${u.email}</li>`)
      .join("");

    const htmlFinal = data.replace("{{usuarios}}", lista);
    res.send(htmlFinal);
  });
};
