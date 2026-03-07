module.exports = (sequelize, DataTypes) => {
  const Department = sequelize.define(
    "departments",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      tableName: "departments",
      engine: "InnoDB",
    },
  );
  // associations
  Department.associate = (models) => {
    Department.hasMany(models.Complaint, {
      foreignKey: "department_id",
      as: "complaints",
    });
  };
  return Department;
};
