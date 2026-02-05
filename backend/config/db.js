const Sequelize = require("sequelize")
const dotenv = require("dotenv")
dotenv.config()

//import models
const UserModel = require("../model/user.model");

// you can replace sequelize with any other names like database connection its just name.
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host : process.env.DB_HOST,
        dialect : "mysql",
        port : process.env.DB_PORT,
    }
)

//define models means tables
const models = {
    User : UserModel(sequelize, Sequelize),
}

const connection = {}

const connectToDatabase = async () => {
    try{
        if(connection.isConnected){
            console.log("=> Using Existing connection")
            return {...models, sequelize}
        }
        await sequelize.authenticate();
        await sequelize.sync();
        connection.isConnected = true;
        console.log("=> created new connection")
        return {...models, sequelize}
    }
    catch (error){
        console.error("=> connection error",error)
        throw error
    }
}

module.exports = {sequelize, connectToDatabase};