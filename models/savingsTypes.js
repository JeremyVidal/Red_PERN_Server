module.exports =  (sequelize, DataTypes) => {
    const SavingsTypes = sequelize.define("savingsTypes", {
      savingsType: {
        type: DataTypes.STRING,
        allowNull: false
      },
    })
    return SavingsTypes;
  }