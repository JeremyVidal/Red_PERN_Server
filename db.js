const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL, {
// const sequelize = new Sequelize('media','postgres', process.env.PASS, {
// host: 'localhost',
dialect: 'postgres'
});

sequelize.authenticate().then(
	function(){
		console.log('Connected to Budget Postgress Database');
	},
	function(err){
		console.log(err);
	}
);


BeginBalance = sequelize.import('./models/beginBalance');
Budget = sequelize.import('./models/budget');
Checking = sequelize.import('./models/checking');
CheckingCategories = sequelize.import('./models/checkingCategories')
CheckingTypes = sequelize.import('./models/checkingTypes');
Savings = sequelize.import('./models/savings');
SavingsCategories = sequelize.import('./models/savingsCategories');
SavingsTypes = sequelize.import('./models/savingsTypes');
User = sequelize.import('./models/user');


User.hasOne(BeginBalance);
BeginBalance.belongsTo(User);

User.hasMany(Budget);
Budget.belongsTo(User);

User.hasMany(Checking);
Checking.belongsTo(User);

User.hasMany(CheckingCategories);
CheckingCategories.belongsTo(User);

User.hasMany(CheckingTypes);
CheckingTypes.belongsTo(User);

User.hasMany(Savings);
Savings.belongsTo(User);

User.hasMany(SavingsCategories);
SavingsCategories.belongsTo(User);

User.hasMany(SavingsTypes);
SavingsTypes.belongsTo(User);

module.exports = sequelize;
