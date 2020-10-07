module.exports =  (sequelize, DataTypes) => {
    const BeginBalance = sequelize.define("beginBalance", {
      balance: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
      }
    })
    return BeginBalance;
  }