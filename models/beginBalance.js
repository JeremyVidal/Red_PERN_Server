module.exports =  (sequelize, DataTypes) => {
    const BeginBalance = sequelize.define("beginBalance", {
      balance: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
	  },
	  accountType: {
		type: DataTypes.STRING,
        allowNull: false  
	  }
    })
    return BeginBalance;
  }