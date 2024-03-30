//Configuração inicial

const express = require('express');
const mongoose = require('mongoose')
const app = express()

// forma de ler JSON( middalwares )
app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

//rotas api
const personRoutes = require('./routes/personRoutes')

app.use('/person', personRoutes)

//Criar uma rota inicial/Endpoint
app.get('/',(req,res)=>{

    //mostrar requisição
    res.json({message: 'Oi express'})
})

//

//Entregar uma porta para acessar
mongoose
.connect(
    'mongodb+srv://api:Ib658012@cluster0.6pitfr8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
)
.then(()=>{
    console.log("Conectado com o MongoDB");
    app.listen(3000);
})
.catch((err)=> console.log(err))

