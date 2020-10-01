module.exports =  (sequelize, DataTypes) => {
    const SavingsCategories = sequelize.define("savingsCategories", {
      savingsCategory: {
        type: DataTypes.STRING,
        allowNull: false
      },
    })
    return SavingsCategories;
  }