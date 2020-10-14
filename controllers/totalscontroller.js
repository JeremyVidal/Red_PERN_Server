const router = require("express").Router();
const BeginBalance = require("../db").import("../models/beginBalance");
const Checking = require("../db").import("../models/checking");
const Savings = require("../db").import("../models/savings");
const Income = require("../db").import("../models/income");
let validateSession = require("../middleware/validate-session");

// -----  Get Checking Total  -----
router.get("/checking", validateSession, (req, res) => {
	Checking.sum('checkingAmount')
	.then((checkingTotal) => res.status(200).json(`Checking Total: ${checkingTotal}`))
});

// -----  Get Savings Total  -----
router.get("/savings", validateSession, (req, res) => {
	Savings.sum('savingsAmount')
	.then((savingsTotal) => res.status(200).json(`Savings Total: ${savingsTotal}`))
});

// -----  Get Checking Begin Balance  Totals -----
router.get("/beginBalanceChecking", validateSession, (req, res) => {
	BeginBalance.sum('checking')
	  .then((balance) => res.status(200).json(balance))
	  .catch((err) => res.status(500).json({ error: err }));
});

// -----  Get Savings Begin Balance  Totals -----
router.get("/beginBalanceSavings", validateSession, (req, res) => {
	BeginBalance.sum('savings')
	  .then((balance) => res.status(200).json(balance))
	  .catch((err) => res.status(500).json({ error: err }));
});

// -----  Get Income Gross Totals -----
router.get("/incomeGross", validateSession, (req, res) => {
	Income.sum('incomeGross')
	  .then((incomeGross) => res.status(200).json(incomeGross))
	  .catch((err) => res.status(500).json({ error: err }));
});

// -----  Get Income Net Totals -----
router.get("/incomeNet", validateSession, (req, res) => {
	Income.sum('incomeNet')
	  .then((incomeNet) => res.status(200).json(incomeNet))
	  .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
