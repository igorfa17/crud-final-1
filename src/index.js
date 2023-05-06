import express from 'express';

const app = express();

app.use(express.json());

app.get('/', (request, response) => {
return response.json('OK');
});
app.listen(8080, () => console.log("Servidor iniciado"));

//Array Para Armazenar Usuarios e Recados

const users = [];
const notes = [];

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
  
  //Rota Para Criar Recados
  app.post('/notes', (request, response) => {
    const { title, description, userId } = request.body;
  
    if (!title || !description || !userId) {
      return response.status(400).send({ error: 'Título, descrição e identificador do usuário são obrigatórios' });
    }
  
    const note = { id: notes.length + 1, title, description, userId };
  
    notes.push(note);
  
    return response.status(201).send({ note });
  });

  //Rota Para Listar Todos Os Recados

  app.get('/notes', (request, response) => {
    return response.json(notes);
  });

  //Rota Para Visualizar Um Recado Especifico

  app.get('/notes/:id', (request, response) => {
    const { id } = request.params;
  
    const note = notes.find(note => note.id === parseInt(id));
  
    if (!note) {
      return response.status(404).send({ error: 'Recado não encontrado.' });
    }
  
    return response.json(note);
  });
  
  //Rota Para Atualizar Um Recado Especifico

  
  