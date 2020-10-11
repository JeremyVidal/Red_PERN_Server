const router = require("express").Router();
const CheckingTypes = require("../db").import("../models/checkingTypes");
let validateSession = require("../middleware/validate-session");

// -----  Checking Type Create  -----
router.post("/create", validateSession, (req, res) => {
	const checkingTypeCreate = {
		checkingType: req.body.checkingType,
	  	userId: req.user.id,
	};
	CheckingTypes.create(checkingTypeCreate)
	  .then((type) => res.status(200).json(type))
	  .catch((err) => res.status(500).json({ error: err }));
});

// -----  Get all Types  -----
router.get("/", validateSession, (req, res) => {
	CheckingTypes.findAll({
		where: { userId: req.user.id },
		order: [
			['checkingType', 'ASC']
		]
	})
	  .then((types) => res.status(200).json(types))
	  .catch((err) => res.status(500).json({ error: err }));
});

// -----  Checking Type Delete  -----
router.delete("/:id", (req, res) => {
	CheckingTypes.destroy({ where: { id: req.params.id } })
	  .then((type) => res.status(200).json(type))
	  .catch((err) => res.json({ error: err }));
});

module.exports = router;
