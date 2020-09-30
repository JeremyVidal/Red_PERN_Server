module.exports =  (sequelize, DataTypes) => {
    const CheckingCategories = sequelize.define("checkingCategories", {
      checkingCategory: {
        type: DataTypes.STRING,
        allowNull: false
      },
    })
    return CheckingCategories;
  }