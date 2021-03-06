module.exports =  (sequelize, DataTypes) => {
    const Checking = sequelize.define("checking", {
      checkingDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      checkingTime: {
        type: DataTypes.TIME,
        allowNull: true
	  },
	  checkingCategory: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      checkingType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      checkingName: {
        type: DataTypes.STRING,
        allowNull: false
	  },
	  checkingDescription: {
        type: DataTypes.STRING,
        allowNull: true
	  },
	  checkingAmount: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
	  },
	  checkingMonth: {
        type: DataTypes.INTEGER,
        allowNull: false
	  }
    })
    return Checking;
  }