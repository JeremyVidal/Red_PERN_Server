const router = require("express").Router();
const SavingsCategories = require("../db").import("../models/savingsCategories");
let validateSession = require("../middleware/validate-session");

// -----  Savings Category Create  -----
router.post("/create", validateSession, (req, res) => {
	const savingsCategoriesCreate = {
		savingsCategory: req.body.savingsCategory,
	  	userId: req.user.id,
	};
	SavingsCategories.create(savingsCategoriesCreate)
	  .then((category) => res.status(200).json(category))
	  .catch((err) => res.status(500).json({ error: err }));
});

// -----  Get all categories  -----
router.get("/", validateSession, (req, res) => {
	SavingsCategories.findAll({
		where: { userId: req.user.id },
		order: [
			['savingsCategory', 'ASC']
		]
	})
	  .then((categories) => res.status(200).json(categories))
	  .catch((err) => res.status(500).json({ error: err }));
});

// -----  Savings Category Delete  -----
router.delete("/:id", (req, res) => {
	SavingsCategories.destroy({ where: { id: req.params.id } })
	  .then((category) => res.status(200).json(category))
	  .catch((err) => res.json({ error: err }));
});

module.exports = router;
