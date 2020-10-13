const router = require("express").Router();
const BeginBalance = require("../db").import("../models/beginBalance");
const Checking = require("../db").import("../models/checking");
const Savings = require("../db").import("../models/savings");
let validateSession = require("../middleware/validate-session");

// -----  Get All Transactions  -----
router.get("/", validateSession, (req, res) => {
	Savings.findAll({
		attributes: ['savingsAmount', [sequelize.fn('sum', sequelize.col('amount')), 'total']],
		group : ['SaleItem.itemId'],
		raw: true,
		order: sequelize.literal('total DESC')avingsTime', 'DESC'],
	]
	})
	.then((transactions) => res.status(200).json(transactions))
	.catch((err) => res.status(500).json({ error: err }));
});




module.exports = router;
