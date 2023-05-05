import express from 'express';

const app = express();

app.use(express.json());

app.get('/', (request, response) => {
return response.json('OK');
});
app.listen(8080, () => console.log("Servidor iniciado"));

//Criando rota de criação de conta

const users = [];

app.post('/signup', (request, response) => {
  const { name, email, password } = request.body;

  if (!name || !email || !password) {
    return response.status(400).send({ error: 'Nome, email e senha são obrigatórios' });
  }

  const userExists = users.some(user => user.email === email);

  if (userExists) {
    return response.status(400).send({ error: 'Esse usuário já existe' });
  }

  const user = { id: users.length + 1, name, email, password };

  users.push(user);

  return response.status(201).send({ user });
});
