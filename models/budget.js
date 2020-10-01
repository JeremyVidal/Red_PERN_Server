module.exports =  (sequelize, DataTypes) => {
    const Budget = sequelize.define("budget", {
      budgetName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      budgetDueDate: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      budgetCategory: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      budgetType: {
        type: DataTypes.STRING,
        allowNull: false
	  },
	  budgetAmount: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
	  },
	  userID: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
    })
    return Budget;
  }