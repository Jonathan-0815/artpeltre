const{Sequelize,DataTypes} = require('sequelize')
const{sequelize} = require('./db')
const Usuario = sequelize.define('Usuario',{
    idUsuario: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nomUsuario: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    apUsuario: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    numContacto: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate:{
            isNumeric: true,
        }

    },
    direccionUsuario: {
        type: DataTypes.STRING,
        allowNull:false,
    },
    contraUsuario:{
        type: DataTypes.STRING,
        allowNull:false
    },
    correoUsuario:{
        type: DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    fecharegisUsuario: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.Now
    }
},

{
    timestamps: false
}
)
module.exports = Usuario;