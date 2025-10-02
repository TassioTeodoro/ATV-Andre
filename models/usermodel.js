const db = require('../db');

async function createUser({ name, email, phone }) {
  const text = `INSERT INTO users (name, email, phone) VALUES ($1, $2, $3) RETURNING *`;
  const values = [name, email, phone];
  const { rows } = await db.query(text, values);
  return rows[0];
}

async function getAllUsers() {
  const { rows } = await db.query(`SELECT id, name, email, phone, created_at FROM users ORDER BY id DESC`);
  return rows;
}

async function getUserByEmail(email) {
  const { rows } = await db.query(`SELECT * FROM users WHERE email=$1`, [email]);
  return rows[0];
}

module.exports = {
  createUser,
  getAllUsers,
  getUserByEmail
};
