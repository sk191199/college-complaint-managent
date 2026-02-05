module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        "users",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement : true,
                primaryKey : true,
            },
            name : {
                type : DataTypes.STRING,
                allowNull : false,
            },
            email:{
                type : DataTypes.STRING(450),
                allowNull: false,
                unique: true,
            
            },
            password : {
                type : DataTypes.STRING(255),
                allowNull: false,
            },
            gender : {
                type : DataTypes.ENUM("male", "female", "others"),
                allowNull: false
            },
            phone : {
                type : DataTypes.STRING(45),
                allowNull: false,
            },
            role : {
                type : DataTypes.ENUM("student", "admin"),
                defaultValue : "student",
                allowNull: false
            },
        },
        {
            timestamps : false,
            tableName : "users",
            engine : "InnoDB"
        }
    );
    return User;

};