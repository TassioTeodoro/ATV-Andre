const request = require('supertest');
const app = require('../app');
const db = require('../db');

beforeAll(async () => {
    // cria a tabela temporária se não existir
    await db.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(150) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      phone VARCHAR(50),
      created_at TIMESTAMP DEFAULT NOW()
    );
  `);
});

afterAll(async () => {
    // limpa a tabela (opcional) e fecha pool
    await db.query('DELETE FROM users;');
    await db.pool.end();
});

describe('Rota de usuários', () => {
    test('GET /register retorna 200 e mostra o formulário', async () => {
        const res = await request(app).get('/register');
        expect(res.statusCode).toBe(200);
        expect(res.text).toMatch(/Cadastro de Usuário/);
    });

    test('POST /register cria usuário e redireciona para /users', async () => {
        const res = await request(app)
            .post('/register')
            .type('form')
            .send({ name: 'Teste', email: `teste${Date.now()}@exemplo.com`, phone: '99999' });
        expect([302, 303]).toContain(res.statusCode);
        // checar redirect
        expect(res.headers.location).toBe('/users');
    });

    test('GET /users lista usuários', async () => {
        const res = await request(app).get('/users');
        expect(res.statusCode).toBe(200);
        expect(res.text).toMatch(/Lista de Usuários/);
    });
});
