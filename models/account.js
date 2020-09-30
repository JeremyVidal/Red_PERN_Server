module.exports =  (sequelize, DataTypes) => {
    const Account = sequelize.define("account", {
      accountName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      accountNumber: {
        type: DataTypes.STRING,
        allowNull: false
      },
      accountDueDate: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
      },
      accountCategory: {
        type: DataTypes.STRING,
        allowNull: false
	  },
	  accountAmount: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
	  },
	  userID: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
    })
    return Account;
  }