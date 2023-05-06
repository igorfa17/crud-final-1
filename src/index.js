import express from 'express';

const app = express();

app.use(express.json());

app.get('/', (request, response) => {
return response.json('OK');
});
app.listen(8080, () => console.log("Servidor iniciado"));

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


  
