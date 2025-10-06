require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/userroutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// rotas
app.use('/', userRoutes);

// rota padrão
app.get('/', (req, res) => res.redirect('/register'));

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`App rodando em http://localhost:${PORT}`);
  });
}

module.exports = app;
