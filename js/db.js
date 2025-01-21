const{Sequelize} = require('sequelize');
require ('dotenv').config()

const sequelize = new Sequelize ('peltreart', 'root', '',{
    host: 'localhost',
    dialect: 'mysql'
})

const connectDB = async () => {
    try{
        await sequelize.authenticate ()
        console.log ('coneccted to database')
     } catch (err){
            console.log ('error conecting to database', err)
    }
}

module.exports = {sequelize,connectDB}