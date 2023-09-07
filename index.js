const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

const news = require('./routes/new')
const marketing = require('./routes/marketing')
const cors = require('cors');
const bodyParser = require('body-parser');

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: '100mb' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rota para exibir "Hello World" ao acessar o caminho "/"
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Rotas
app.use('/', news);
app.use('/', marketing);

// Variáveis de usuário e senha do banco de dados mongo atlas
const mongodb_url = process.env.mongodb_url;

// Mongoose e conexão com banco de dados
mongoose
  .connect(mongodb_url)
  .then(() => {
    const port = process.env.PORT || 4000;
    app.listen(port, () => {
      console.log(`Conexão bem sucedida com banco de dados g1-mongodb na porta: ${port}`);
    });
  })
  .catch((err) => {
    console.log("Houve um erro ao tentar conectar com o banco de dados g1-mongodb" + err);
  });
