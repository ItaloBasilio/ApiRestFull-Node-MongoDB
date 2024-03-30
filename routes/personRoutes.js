const router = require('express').Router();
const Person = require('../models/person');

// rota api
router.post('/', async (req, res) => {
    // req.body
    const { name, salary, approved } = req.body;

    if (!name) {
        res.status(422).json({ error: 'Nome é obrigatório' });
        return; // retornar para evitar a execução do código abaixo em caso de erro
    }

    // criar uma nova instância de Person
    const person = new Person({
        name,
        salary,
        approved
    });

    // criar dados
    try {
        // salvar no banco de dados
        await person.save();
        res.status(201).json({ message: "Pessoa inserida no sistema com sucesso" });
    } catch (error) {
        res.status(500).json({ error: error });
    }
});


// read- ler dados



module.exports = router;
