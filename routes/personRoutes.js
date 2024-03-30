const router = require('express').Router();
const Person = require('../models/person');

// rota api
router.post('/', async (req, res) => {
    // req.body
    const { name, salary, approved } = req.body;

    if (!name) {
        res.status(422).json({ error: 'Nome é obrigatório' });
        return
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
router.get('/', async(req,res) => {

    try {

       const people = await Person.find() 
       res.status(200).json(people);
        
    } catch (error) {
        res.status(500).json({ error: error });
    }
})

//rota dinamica - pesquisar pelo ID

router.get('/:id', async (req,res) => {

    //extrair o dados da requisição> pela url = req.params
    const id = req.params.id

    try {
        const person = await Person.findOne({_id: id})

        res.status(200).json(person)
        
    } catch (error) {
        res.status(422).json({ message: "Usuario nao encontrado"});
    }

})

//Update = atualização de dados (put,patch)
router.patch('/:id', async (req,res) => {

    //extrair o dados da requisição> pela url = req.params
    const id = req.params.id

    const { name, salary, approved } = req.body;

    const person = {
        name,
        salary,
        approved
    }

    try {

        const updatedPerson = await Person.updateOne({_id: id}, person)

        // if(updatedPerson.matchedCount === 0){
        //     res.status(422).json({ message: "Usuario nao encontrado"}); 
        // }

        res.status(200).json(person)
        
    } catch (error) {
        res.status(422).json({ message: "Usuario nao encontrado"});
    }

} )


module.exports = router;
