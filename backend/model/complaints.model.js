module.exports = (sequelize, DataTypes) => {
  const Complaint = sequelize.define(
    "complaints",
    {
      complaint_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT("long"),
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      department_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "departments",
          key: "id",
        },
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      status: {
        type: DataTypes.ENUM("pending", "in-progress", "resolved", "rejected"),
        allowNull: false,
        defaultValue: "pending",
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "complaints",
      timestamps: false,
    },
  );
  // associations
  Complaint.associate = (models) => {
    Complaint.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
    });

    Complaint.belongsTo(models.Department, {
      foreignKey: "department_id",
      as: "department",
    });
  };
  return Complaint
};
