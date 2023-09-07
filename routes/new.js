const router = require('express').Router();
const checkToken = require('../midlewares/checktoken');
const New = require('../models/New'); // Importando o modelo 'New'


// Rota que cria uma notícia.
router.post('/news', async (req, res) => {
  const { title, content, image } = req.body;

  try {
    const newNews = {
      title,
      content,
      image
    };

    const newsCreated = await New.create(newNews);
    res.status(200).json({ message: "Notícia criada com sucesso.", id: newsCreated._id });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: `Erro interno no servidor: ${err}` });
  }
});

// Rota que atualiza uma notícia específica
router.patch('/news/:id', async (req, res) => {
  const { title, content, image } = req.body;

  const newsUpdated = { 
    title,
    content,
    image
  };

  try {
    await New.updateOne({ _id: req.params.id }, newsUpdated);
    res.status(200).json({ message: "Notícia atualizada com sucesso!" });
  } catch (err) {
    res.status(500).json({ message: "Erro ao atualizar notícia." });
  }
});

// Rota que retorna uma notícia específica
router.get('/news/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const getNews = await New.findById(id);

    if (getNews) {
      res.status(200).json(getNews);
    } else {
      res.status(404).json({ message: "Notícia não encontrada." });
    }
  } catch (error) {
    res.status(500).json({ message: "Houve um erro ao tentar retornar uma notícia: " + error });
  }
});

// Rota que obtém uma lista de notícias
router.get('/news', async (req, res) => {
  try {
    const news = await New.find();
    res.status(200).json(news);
  } catch (err) {
    res.status(500).json({ message: "Houve um erro interno no servidor" });
  }
});

// Rota para excluir uma notícia
router.delete('/news/:id',  async (req, res) => {
  try {
    const deletedNews = await New.deleteOne({ _id: req.params.id });

    if (deletedNews.deletedCount === 1) {
      res.status(200).json({ message: 'Notícia excluída com sucesso.' });
    } else {
      res.status(404).json({ message: 'Notícia não encontrada.' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Erro ao excluir notícia.' });
  }
});

module.exports = router;
