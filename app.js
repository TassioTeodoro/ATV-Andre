const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userroutes");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "views")));

// Rotas
app.use("/", userRoutes);

// Inicia servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:3000`);
});
