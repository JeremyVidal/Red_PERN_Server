module.exports =  (sequelize, DataTypes) => {
    const BeginBalance = sequelize.define("beginBalance", {
	  checking: {
		type: DataTypes.DECIMAL(10,2),
        allowNull: false  
	  },
	  savings: {
		type: DataTypes.DECIMAL(10,2),
        allowNull: false  
	  }
    })
    return BeginBalance;
  }