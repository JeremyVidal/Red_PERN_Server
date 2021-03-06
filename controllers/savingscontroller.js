const router = require("express").Router();
const Savings = require("../db").import("../models/savings");
let validateSession = require("../middleware/validate-session");

// -----  Savings Transaction Create  -----
router.post("/create", validateSession, (req, res) => {
	const savTransaction = {
		savingsDate: req.body.savingsDate,
		savingsTime: req.body.savingsTime,
		savingsCategory: req.body.savingsCategory,
		savingsType: req.body.savingsType,
		savingsName: req.body.savingsName,
		savingsDescription: req.body.savingsDescription,
		savingsAmount: req.body.savingsAmount,
		savingsMonth: new Date(req.body.savingsDate).getMonth() + 1,
	  	userId: req.user.id,
	};
	Savings.create(savTransaction)
	  .then((transaction) => res.status(200).json(transaction))
	  .catch((err) => res.status(500).json({ error: err }));
});

// -----  Get a Transaction  -----
router.get("/:id", validateSession, (req, res) => {
	Savings.findOne({
	  where: { id: req.params.id },
	})
	  .then((transaction) => res.status(200).json(transaction))
	  .catch((err) => res.status(500).json({ error: err }));
});

// -----  Get All Transactions  -----
router.get("/", validateSession, (req, res) => {
	Savings.findAll({
	  where: { userId: req.user.id, savingsMonth: new Date().getMonth() + 1  },
	  order: [
		['savingsDate', 'DESC'],
		['savingsTime', 'DESC'],
	]
	})
	.then((transactions) => res.status(200).json(transactions))
	.catch((err) => res.status(500).json({ error: err }));
});

// -----  Update a Transaction  -----
router.put("/update/:id", validateSession, (req, res) => {
	const updateSavingsTransaction = {
		savingsDate: req.body.savingsDate,
		savingsTime: req.body.savingsTime,
		savingsCategory: req.body.savingsCategory,
		savingsType: req.body.savingsType,
		savingsName: req.body.savingsName,
		savingsDescription: req.body.savingsDescription,
		savingsAmount: req.body.savingsAmount,
	};
  
	const query = { where: { id: req.params.id, userId: req.user.id } };      
  
	Savings.update(updateSavingsTransaction, query)
	  .then((transaction) => res.status(200).json(transaction))
	  .catch((err) => res.status(500).json({ error: err }));
});

// -----  Delete a Transaction  -----
router.delete("/:id", (req, res) => {
	Savings.destroy({ where: { id: req.params.id } })
	  .then((transaction) => res.status(200).json(transaction))
	  .catch((err) => res.json(req.errors));
});

module.exports = router;
