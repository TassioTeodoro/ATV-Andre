const path = require('path');
const userModel = require('../models/usermodel');

async function showRegister(req, res) {
  res.sendFile(path.join(__dirname, '../views/register.html'));
}

async function registerUser(req, res) {
  try {
    const { name, email, phone } = req.body;
    if (!name || !email) {
      return res.status(400).send("Nome e email são obrigatórios.");
    }
    const existing = await userModel.getUserByEmail(email);
    if (existing) {
      return res.status(400).send("Email já cadastrado.");
    }

    await userModel.createUser({ name, email, phone });
    res.redirect('/users');
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro no servidor.");
  }
}

async function listUsers(req, res) {
  try {
    const users = await userModel.getAllUsers();
    // como é HTML estático, você pode gerar dinamicamente aqui (sem template engine)
    let html = `
      <html>
        <head><title>Lista de Usuários</title></head>
        <body>
          <h1>Usuários Cadastrados</h1>
          <ul>
            ${users.map(u => `<li>${u.name} - ${u.email} - ${u.phone || ''}</li>`).join('')}
          </ul>
          <a href="/register">Cadastrar Novo</a>
        </body>
      </html>
    `;
    res.send(html);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao listar usuários');
  }
}

module.exports = { showRegister, registerUser, listUsers };
