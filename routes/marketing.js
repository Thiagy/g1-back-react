const router = require('express').Router();
const checkToken = require('../midlewares/checktoken');
const Marketing = require('../models/Marketing'); // Importando o modelo 'Marketing'

// Rota que cria um item de marketing
router.post('/marketing', async (req, res) => {
  const { image } = req.body;

  try {
    const newMarketing = {
      image
    };

    const marketingCreated = await Marketing.create(newMarketing);
    res.status(200).json({ message: "Item de marketing criado com sucesso.", id: marketingCreated._id });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: `Erro interno no servidor: ${err}` });
  }
});

// Rota que atualiza um item de marketing específico
router.patch('/marketing/:id', async (req, res) => {
  const { image } = req.body;

  const marketingUpdated = { 
    image
  };

  try {
    await Marketing.updateOne({ _id: req.params.id }, marketingUpdated);
    res.status(200).json({ message: "Item de marketing atualizado com sucesso!" });
  } catch (err) {
    res.status(500).json({ message: "Erro ao atualizar item de marketing." });
  }
});

// Rota que retorna um item de marketing específico
router.get('/marketing/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const getMarketing = await Marketing.findById(id);

    if (getMarketing) {
      res.status(200).json(getMarketing);
    } else {
      res.status(404).json({ message: "Item de marketing não encontrado." });
    }
  } catch (error) {
    res.status(500).json({ message: "Houve um erro ao tentar retornar um item de marketing: " + error });
  }
});

// Rota que obtém uma lista de itens de marketing
router.get('/marketing', async (req, res) => {
  try {
    const marketingItems = await Marketing.find();
    res.status(200).json(marketingItems);
  } catch (err) {
    res.status(500).json({ message: "Houve um erro interno no servidor" });
  }
});

// Rota para excluir um item de marketing
router.delete('/marketing/:id',  async (req, res) => {
  try {
    const deletedMarketing = await Marketing.deleteOne({ _id: req.params.id });

    if (deletedMarketing.deletedCount === 1) {
      res.status(200).json({ message: 'Item de marketing excluído com sucesso.' });
    } else {
      res.status(404).json({ message: 'Item de marketing não encontrado.' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Erro ao excluir item de marketing.' });
  }
});

module.exports = router;
