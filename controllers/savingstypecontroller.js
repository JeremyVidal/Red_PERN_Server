const router = require("express").Router();
const SavingsTypes = require("../db").import("../models/savingsTypes");
let validateSession = require("../middleware/validate-session");

// -----  Savings Type Create  -----
router.post("/create", validateSession, (req, res) => {
	const savingsTypeCreate = {
		savingsType: req.body.savingsType,
	  	userID: req.user.id,
	};
	SavingsTypes.create(savingsTypeCreate)
	  .then((type) => res.status(200).json(type))
	  .catch((err) => res.status(500).json({ error: err }));
});

// -----  Savings Type Delete  -----
router.delete("/:id", (req, res) => {
	SavingsTypes.destroy({ where: { id: req.params.id } })
	  .then((type) => res.status(200).json(type))
	  .catch((err) => res.json({ error: err }));
});

module.exports = router;