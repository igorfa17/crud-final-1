import express from 'express';
import bcrypt from 'bcrypt';

const app = express();

app.use(express.json());

app.get('/', (request, response) => {
  return response.json('OK');
});

app.listen(8080, () => console.log("Servidor iniciado"));

// Array Para Armazenar Usuarios e Recados

const users = [];
const notes = [];

import bcrypt from 'bcrypt';

//Rota de Criação de Conta
app.post('/signup', async (request, response) => {
  const { name, email, password } = request.body;

  if (!name || !email || !password) {
    return response.status(400).send({ error: 'Nome, email e senha são obrigatórios' });
  }

  const userExists = users.some(user => user.email === email);

  if (userExists) {
    return response.status(400).send({ error: 'Um usuário com este email já foi cadastrado.' });
  }

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const user = { id: users.length + 1, name, email, password: hashedPassword };

  users.push(user);

  return response.status(201).send({ user });
});

// Rota de Login
app.post('/login', async (request, response) => {
  const { email, password } = request.body;

  if (!email || !password) {
    return response.status(400).send({ error: 'Email e senha são obrigatórios.' });
  }

  const user = users.find(user => user.email === email);

  if (!user) {
    return response.status(401).send({ error: 'Email ou senha incorretos.' });
  }

  try {
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return response.status(401).send({ error: 'Email ou senha incorretos.' });
    }

    return response.send({ user });
  } catch (error) {
    return response.status(500).send({ error: 'Erro ao fazer login.' });
  }
});

// Rota Para Criar Recados

app.post('/notes', (request, response) => {
  const { title, description, id } = request.body;

  if (!title || !description || !id) {
    return response.status(400).send({ error: 'Título, descrição e identificador do usuário são obrigatórios' });
  }

  const note = { id: notes.length + 1, title, description, id };

  notes.push(note);

  return response.status(201).send({ note });
});

// Rota Para Listar Todos Os Recados

app.get('/notes', (request, response) => {
  return response.json(notes);
});

// Rota Para Visualizar Um Recado Especifico

app.get('/notes/:id', (request, response) => {
  const { id } = request.params;

  const note = notes.find(note => note.id === parseInt(id));

  if (!note) {
    return response.status(404).send({ error: 'Recado não encontrado.' });
  }

  return response.json(note);
});

// Rota Para Atualizar E Excluir Um Recado Especifico

app.put('/notes/:id', (request, response) => {
  const { title, description } = request.body;
  const noteId = parseInt(request.params.id);

  const noteIndex = notes.findIndex(note => note.id === noteId);

  if (noteIndex < 0) {
    return response.status(404).send({ error: 'Recado não encontrado.' });
  }

  const note = notes[noteIndex];
  const updatedNote = { ...note, title, description };

  notes[noteIndex] = updatedNote;

  return response.send({ note: updatedNote });
});

app.delete('/notes/:id', (request, response) => {
  const noteId = parseInt(request.params.id);
  const noteIndex = notes.findIndex(note => note.id === noteId);

  if (noteIndex < 0) {
    return response.status(404).send({ error: 'Recado não encontrado' });
  }

  notes.splice(noteIndex, 1);

  return response.status(204).send();
});