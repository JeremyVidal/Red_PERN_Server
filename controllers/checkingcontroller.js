const router = require("express").Router();
const Checking = require("../db").import("../models/checking");
let validateSession = require("../middleware/validate-session");

// -----  Checking Transaction Create  -----
router.post("/create", validateSession, (req, res) => {
	const checkTransaction = {
		paymentDate: req.body.paymentDate,
		paymentTime: req.body.paymentTime,
		paymentCategory: req.body.paymentCategory,
		paymentType: req.body.paymentType,
		paymentName: req.body.paymentName,
		paymentDescription: req.body.paymentDescription,
		paymentAmount: req.body.paymentAmount,
	  	userID: req.user.id,
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

// -----  Update a Transaction  -----
router.put("/update/:id", validateSession, (req, res) => {
	const updateCheckingTransaction = {
		paymentDate: req.body.paymentDate,
		paymentTime: req.body.paymentTime,
		paymentCategory: req.body.paymentCategory,
		paymentType: req.body.paymentType,
		paymentName: req.body.paymentName,
		paymentDescription: req.body.paymentDescription,
		paymentAmount: req.body.paymentAmount,
	};
  
	const query = { where: { id: req.params.id, userID: req.user.id } };      
  
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
