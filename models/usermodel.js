let users = []; // Simulação de banco de dados em memória

class User {
  constructor(nome, email) {
    this.nome = nome;
    this.email = email;
  }

  static addUser(nome, email) {
    const user = new User(nome, email);
    users.push(user);
    return user;
  }

  static getAllUsers() {
    return users;
  }
}

module.exports = User;
