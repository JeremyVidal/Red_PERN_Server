module.exports =  (sequelize, DataTypes) => {
    const Savings = sequelize.define("savings", {
	  savingsDate: {
        type: DataTypes.DATE,
        allowNull: false
      },
      savingsTime: {
        type: DataTypes.TIME,
        allowNull: false
	  },
	  savingsCategory: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      savingsType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      savingsName: {
        type: DataTypes.STRING,
        allowNull: false
	  },
	  savingsDescription: {
        type: DataTypes.STRING,
        allowNull: false
	  },
	  savingsAmount: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
	  }
    })
    return Savings;
  }