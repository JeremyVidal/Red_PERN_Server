const router = require("express").Router();
const Checking = require("../db").import("../models/checking");
let validateSession = require("../middleware/validate-session");

// -----  Checking Transaction Create  -----
router.post("/create", validateSession, (req, res) => {
	const checkTransaction = {
		checkingDate: req.body.checkingDate,
		checkingTime: req.body.checkingTime,
		checkingCategory: req.body.checkingCategory,
		checkingType: req.body.checkingType,
		checkingName: req.body.checkingName,
		checkingDescription: req.body.checkingDescription,
		checkingAmount: req.body.checkingAmount,
	  	userId: req.user.id,
	};
	Checking.create(checkTransaction)
	  .then((transaction) => res.status(200).json(transaction))
	  .catch((err) => res.status(500).json({ error: err }));
});

// -----  Get a Transaction  -----
router.get("/:id", validateSession, (req, res) => {
	Checking.findOne({
	  where: { id: req.params.id },
	})
	  .then((transaction) => res.status(200).json(transaction))
	  .catch((err) => res.status(500).json({ error: err }));
});

// -----  Get All Transactions  -----
router.get("/", validateSession, (req, res) => {
	Checking.findAll({
	  where: { userId: req.user.id },
	})
	.then((transactions) => res.status(200).json(transactions))
	.catch((err) => res.status(500).json({ error: err }));
});


// -----  Update a Transaction  -----
router.put("/update/:id", validateSession, (req, res) => {
	const updateCheckingTransaction = {
		checkingDate: req.body.checkingDate,
		checkingTime: req.body.checkingTime,
		checkingCategory: req.body.checkingCategory,
		checkingType: req.body.checkingType,
		checkingName: req.body.checkingName,
		checkingDescription: req.body.checkingDescription,
		checkingAmount: req.body.checkingAmount,
	};
  
	const query = { where: { id: req.params.id, userId: req.user.id } };      
  
	Checking.update(updateCheckingTransaction, query)
	  .then((transaction) => res.status(200).json(transaction))
	  .catch((err) => res.status(500).json({ error: err }));
});

// -----  Delete a Transaction  -----
router.delete("/:id", (req, res) => {
	Checking.destroy({ where: { id: req.params.id } })
	  .then((transaction) => res.status(200).json(transaction))
	  .catch((err) => res.json(req.errors));
});

module.exports = router;
