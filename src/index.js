import express from 'express';

const app = express();

app.use(express.json());

app.get('/', (request, response) => {
return response.json('OK');
});
app.listen(3000, () => console.log("Servidor iniciado na porta 3000"));

//Const de rotas

  const db = {
    users: [],
    messages: []
  }

  //Criação de conta

  app.post('/signup', (req, res) => {
  const { name, email, password } = req.body;

  // Verifica se já existe um usuário com o mesmo e-mail
  const userExists = db.users.find(user => user.email === email);
  if (userExists) {
    return res.status(400).json({ error: 'E-mail já cadastrado' });
  }

  // Cria o novo usuário
  const newUser = {
    id: db.users.length + 1,
    name,
    email,
    password
  };
  db.users.push(newUser);

  return res.status(201).json(newUser);
});

//Crud de Recados

// Lista todos os recados
app.get('/messages', (req, res) => {
    return res.status(200).json(db.messages);
  });
  
  // Cria um novo recado
  app.post('/messages', (req, res) => {
    const { title, description, userId } = req.body;
  
    // Verifica se o usuário existe
    const user = db.users.find(user => user.id === userId);
    if (!user) {
      return res.status(400).json({ error: 'Usuário não encontrado' });
    }
  
    // Cria o novo recado
    const newMessage = {
      id: db.messages.length + 1,
      title,
      description,
      userId
    };
    db.messages.push(newMessage);
  
    return res.status(201).json(newMessage);
  });
  
  // Atualiza um recado existente
  app.put('/messages/:id', (req, res) => {
    const messageId = parseInt(req.params.id);
    const { title, description } = req.body;
  });

// Busca o recado pelo ID
app.get('/recados/:id', (request, response) => {
    const { id } = request.params;
    const recado = recados.find(r => r.id === id);
  
    if (!recado) {
      return response.status(404).json({ error: 'Recado não encontrado' });
    }
  
    return response.json(recado);
  });
  
  // Cria um recado
  app.post('/recados', (request, response) => {
    const { title, description, userId } = request.body;
  
    if (!title || !description || !userId) {
      return response.status(400).json({ error: 'Dados incompletos' });
    }
  
    const recado = {
      id: uuidv4(),
      title,
      description,
      userId
    };
  
    recados.push(recado);
  
    return response.json(recado);
  });
  
  // Atualiza um recado
  app.put('/recados/:id', (request, response) => {
    const { id } = request.params;
    const { title, description } = request.body;
  
    const recadoIndex = recados.findIndex(r => r.id === id);
  
    if (recadoIndex < 0) {
      return response.status(404).json({ error: 'Recado não encontrado' });
    }
  
    const recado = {
      id,
      title,
      description,
      userId: recados[recadoIndex].userId
    };
  
    recados[recadoIndex] = recado;
  
    return response.json(recado);
  });
  
  // Exclui um recado
  app.delete('/recados/:id', (request, response) => {
    const { id } = request.params;
  
    const recadoIndex = recados.findIndex(r => r.id === id);
  
    if (recadoIndex < 0) {
      return response.status(404).json({ error: 'Recado não encontrado' });
    }
  
    recados.splice(recadoIndex, 1);
  
    return response.status(204).send();
  });
  
  app.listen(8080, () => console.log("Servidor iniciado"));
  