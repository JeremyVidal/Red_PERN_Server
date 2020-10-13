const router = require("express").Router();
const Budget = require("../db").import("../models/budget");
let validateSession = require("../middleware/validate-session");

// -----  Budget Create  -----
router.post("/create", validateSession, (req, res) => {
	const budgetCreate = {
		budgetName: req.body.budgetName,
		budgetDueDate: req.body.budgetDueDate,
		budgetCategory: req.body.budgetCategory,
		budgetType: req.body.budgetType,
		budgetAmount: req.body.budgetAmount,
	  	userId: req.user.id,
	};
	Budget.create(budgetCreate)
	  .then((budget) => res.status(200).json(budget))
	  .catch((err) => res.status(500).json({ error: err }));
});

// -----  Get a Budget Item  -----
router.get("/", validateSession, (req, res) => {
	Budget.findAll({
	  where: { userId: req.user.id },
	})
	  .then((transaction) => res.status(200).json(transaction))
	  .catch((err) => res.status(500).json({ error: err }));
});

// -----  Budget Delete  -----
router.delete("/:id", (req, res) => {
	Budget.destroy({ where: { id: req.params.id } })
	  .then((budget) => res.status(200).json(budget))
	  .catch((err) => res.json({ error: err }));
});

module.exports = router;
