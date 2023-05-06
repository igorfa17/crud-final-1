import express from 'express';

const app = express();

app.use(express.json());

app.get('/', (request, response) => {
return response.json('OK');
});
app.listen(8080, () => console.log("Servidor iniciado"));

const users = [];

//Rota de Criação de Conta

app.post('/signup', (request, response) => {
  const { name, email, password } = request.body;

  if (!name || !email || !password) {
    return response.status(400).send({ error: 'Nome, email e senha são obrigatórios' });
  }

  const userExists = users.some(user => user.email === email);

  if (userExists) {
    return response.status(400).send({ error: 'Um usuário com este email já foi cadastrado.' });
  }

  const user = { id: users.length + 1, name, email, password };

  users.push(user);

  return response.status(201).send({ user });
});

//Rota de Login

app.post('/login', (request, response) => {
    const { email, password } = request.body;
  
    if (!email || !password) {
      return response.status(400).send({ error: 'Email e senha são obrigatórios.' });
    }
  
    const user = users.find(user => user.email === email && user.password === password);
  
    if (!user) {
      return response.status(401).send({ error: 'Email ou senha incorretos.' });
    }
  
    return response.send({ user });
  });
  