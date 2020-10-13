module.exports =  (sequelize, DataTypes) => {
    const Income = sequelize.define("budget", {
      	incomeSource: {
        	type: DataTypes.STRING,
        	allowNull: false
      	},
      	incomeDate: {
        	type: DataTypes.INTEGER,
        	allowNull: false
      	},
      	incomeGross: {
			type: DataTypes.DECIMAL(10,2),
			allowNull: false
	  },
	  	incomeNet: {
		  	type: DataTypes.DECIMAL(10,2),
		  	allowNull: false
		},
		incomeNote: {
			type: DataTypes.STRING,
			allowNull: false
		},
    })
    return Income;
  }