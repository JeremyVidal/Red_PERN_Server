const router = require("express").Router();
const Income = require("../db").import("../models/income");
let validateSession = require("../middleware/validate-session");

// -----  Income Create  -----
router.post("/", validateSession, (req, res) => {
	const incomeCreate = {
		incomeSource: req.body.incomeSource,
		incomeDate: req.body.incomeDate,
		incomeGross: req.body.incomeGross,
		incomeNet: req.body.incomeNet,
		incomeNote: req.body.incomeNote,
	};
	Income.create(incomeCreate)
	  .then((income) => res.status(200).json(income))
	  .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
