const router = require("express").Router();
const BeginBalance = require("../db").import("../models/beginBalance");
let validateSession = require("../middleware/validate-session");

// -----  beginBalance Create  -----
router.post("/create", validateSession, (req, res) => {
	const beginningBalance = {
		checking: req.body.checking,
		savings: req.body.savings,
	  	userId: req.user.id,
	};
	BeginBalance.create(beginningBalance)
	  .then((balance) => res.status(200).json(balance))
	  .catch((err) => res.status(500).json({ error: err }));
});

// -----  Get beginBalance  -----
router.get("/", validateSession, (req, res) => {
	BeginBalance.findOne({
	  where: { userId: req.user.id },
	})
	  .then((balance) => res.status(200).json(balance))
	  .catch((err) => res.status(500).json({ error: err }));
});

// -----  Update beginBalance  -----
router.put("/update", validateSession, (req, res) => {
	const updateBeginBalance = {
		checking: req.body.checking,
		savings: req.body.savings
	};
  
	const query = { where: { userId: req.user.id  } };      
  
	BeginBalance.update(updateBeginBalance, query)
	  .then((balance) => res.status(200).json(balance))
	  .catch((err) => res.status(500).json({ error: err }));
});





module.exports = router;
