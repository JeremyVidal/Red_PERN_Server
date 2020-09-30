require('dotenv').config()
const express = require('express');
const app = express(); 



const sequelize = require('./db');
sequelize.sync();

app.use(express.json());
app.use(require('./middleware/headers'));

let user = require('./controllers/usercontroller');
app.use('/user', user);
let account = require('./controllers/accountcontroller');
app.use('/account', account);
let beginBalance = require('./controllers/beginBalancecontroller');
app.use('/beginBalance', beginBalance);
let budget = require('./controllers/budgetcontroller');
app.use('/budget', budget);
let checkingCategories = require('./controllers/checkingcategoriescontroller');
app.use('/checkingCategories', checkingCategories);
let checking = require('./controllers/checkingcontroller');
app.use('/checking', checking);
let checkingTypes = require('./controllers/checkingtypecontroller');
app.use('/user', user);
let savingsCategories = require('./controllers/savingscategoriescontroller');
app.use('/savingsCategories', savingsCategories);
let savings = require('./controllers/savingscontroller');
app.use('/savings', savings);
let savingsTypes = require('./controllers/savingstypecontroller');
app.use('/savingsTypes', savingsTypes);





// Activates app.js
app.listen(process.env.PORT, () => {
console.log(`App is lisenting on port ${process.env.PORT}`);
})
