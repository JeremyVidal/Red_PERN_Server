const router = require("express").Router();
const CheckingCategories = require("../db").import("../models/checkingCategories");
let validateSession = require("../middleware/validate-session");

// -----  Checking Category Create  -----
router.post("/create", validateSession, (req, res) => {
	const checkingCategoriesCreate = {
		checkingCategory: req.body.checkingCategory,
	  	userId: req.user.id,
	};
	CheckingCategories.create(checkingCategoriesCreate)
	  .then((category) => res.status(200).json(category))
	  .catch((err) => res.status(500).json({ error: err }));
});

// -----  Get all categories  -----
router.get("/", validateSession, (req, res) => {
	CheckingCategories.findAll({
		where: { userId: req.user.id },
		order: [
			['checkingCategory', 'ASC']
		]
	})
	  .then((categories) => res.status(200).json(categories))
	  .catch((err) => res.status(500).json({ error: err }));
});

// -----  Checking Category Delete  -----
router.delete("/:id", (req, res) => {
	CheckingCategories.destroy({ where: { id: req.params.id } })
	  .then((category) => res.status(200).json(category))
	  .catch((err) => res.json({ error: err }));
});

module.exports = router;
