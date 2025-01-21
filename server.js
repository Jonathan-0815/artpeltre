const express = require('express');
const cors = require('cors')
const{connectDB} = require('./js/db')
const bodyParser = require('body-parser')
const path = require('path')
require('dotenv').config()
const app = express()

connectDB()

app.use(cors())
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname,'html')))

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, 'html', 'formulario.html'))
})

app.use('/api/auth', require ('./routes/auth'))

const PORT = process.env.PORT || 3000;

app.listen(PORT, async() =>{
    console.log(`server is running http://localhost:${PORT}`)
    const {sequelize} = require('./js/db');

    try{
        await sequelize.sync();
        console.log('Database synced');
    }catch(err){
        console.log('error base de datos', err);
    }
});