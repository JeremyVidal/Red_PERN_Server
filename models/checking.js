module.exports =  (sequelize, DataTypes) => {
    const Checking = sequelize.define("checking", {
      paymentDate: {
        type: DataTypes.DATE,
        allowNull: false
      },
      paymentTime: {
        type: DataTypes.TIME,
        allowNull: true
	  },
	  paymentCategory: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
      },
      paymentType: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
      },
      paymentName: {
        type: DataTypes.STRING,
        allowNull: false
	  },
	  paymentDescription: {
        type: DataTypes.STRING,
        allowNull: true
	  },
	  paymentAmount: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
	  },
	  userID: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
    })
    return Checking;
  }