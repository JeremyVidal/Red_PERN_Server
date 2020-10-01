const router = require("express").Router();
const SavingsCategories = require("../db").import("../models/savingsCategories");
let validateSession = require("../middleware/validate-session");

// -----  Savings Category Create  -----
router.post("/create", validateSession, (req, res) => {
	const savingsCategoriesCreate = {
		savingsCategory: req.body.savingsCategory,
	  	userID: req.user.id,
	};
	SavingsCategories.create(savingsCategoriesCreate)
	  .then((category) => res.status(200).json(category))
	  .catch((err) => res.status(500).json({ error: err }));
});

// -----  Savings Category Delete  -----
router.delete("/:id", (req, res) => {
	SavingsCategories.destroy({ where: { id: req.params.id } })
	  .then((category) => res.status(200).json(category))
	  .catch((err) => res.json({ error: err }));
});

module.exports = router;
