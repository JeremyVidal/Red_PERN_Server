module.exports =  (sequelize, DataTypes) => {
    const CheckingTypes = sequelize.define("checkingTypes", {
      checkingType: {
        type: DataTypes.STRING,
        allowNull: false
      },
    })
    return CheckingTypes;
  }