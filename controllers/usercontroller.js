const router = require("express").Router();
const User = require("../db").import("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
let validateSession = require("../middleware/validate-session");

// -----  User Signup  -----
router.post("/signup", (req, res) => {
  	User.create({
    	firstName: req.body.firstName,
    	lastName: req.body.lastName,
		email: req.body.email,
		admin: false,
    	// password: req.body.password
    	password: bcrypt.hashSync(req.body.password, 11),
  	})
    .then((user) => {
      	let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        	expiresIn: "1d",
      	});
      	res.json({
        	user: user,
        	message: "User Created!",
        	sessionToken: token,
      	});
    })
    .catch((err) => res.status(500).json({ error: err }));
});

// -----  Admin Signup  -----
router.post("/admin", (req, res) => {
	User.create({
	  firstName: req.body.firstName,
	  lastName: req.body.lastName,
	  email: req.body.email,
	  admin: true,
	  // password: req.body.password
	  password: bcrypt.hashSync(req.body.password, 11),
	})
  .then((user) => {
		let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
		  expiresIn: "1d",
		});
		res.json({
		  user: user,
		  message: "User Created!",
		  sessionToken: token,
		});
  })
  .catch((err) => res.status(500).json({ error: err }));
});
// -----  User Login  -----
router.post("/login", (req, res) => {
  	User.findOne({ where: { email: req.body.email } }).then(
		(user) => {
			if (user) {
				bcrypt.compare(req.body.password, user.password, (err, matches) => {
					if (matches){
						let token = jwt.sign(
							{ id: user.id },
							process.env.JWT_SECRET,
							{
								expiresIn: "1d",
							}
						);
						res.status(200).json({
						user: user,
						message: "Successfully logged in!",
						sessionToken: token,
						});
					} 
					else {
					res.status(502).send({ error: "Bad Gateway" });
					}
				});
			} 
			else{
				res.status(500).send({ error: "User does not exist" });
			}
		},
		(err) => res.status(501).send({ error: "Failed to Process" })
	);
});

// -----  Get User  -----
router.get("/", validateSession, (req, res) => {
	User.findOne({ where: {id: req.user.id } })
	  	.then((user) => res.status(201).json(user))
	  	.catch((err) => res.status(500).json({ error: err }));
});

// -----  Get Full Name  -----
router.get("/name", validateSession, (req, res) => {
	User.findOne({ 
		attributes: ['firstName', 'lastName'],
		where: {id: req.user.id } })
	  	.then((user) => res.status(201).json(user))
	  	.catch((err) => res.status(500).json({ error: err }));
});

// -----  Get All Users  -----
router.get("/all", (req, res) => {
	User.findAll({
		attributes: ['id','firstName', 'lastName', 'email', 'admin'],
		where: {admin: false},
		order: [
			['lastName', 'ASC'],
		]
	})
	  	.then((user) => res.status(201).json(user))
	  	.catch((err) => res.status(500).json({ error: err }));
});


// -----  Update User Information -----
router.put("/", validateSession, (req, res) => {
  	let userid = req.user.id;

  	const updateUser={
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
  };
  if (req.body.password != ''){
	  updateUser.password = bcrypt.hashSync(req.body.password, 11)
	//   console.log(req.body.password)
  }

  	const query = { where: {id: userid} };
  	User.update(updateUser, query)
    	.then((user) => res.status(201).json({ message: `${user} records updated` }))
    	.catch((err) => res.status(500).json({ error: err }));
});


// -----  Delete User  -----
router.delete("/", validateSession, function (req, res) {
  	let userid = req.user.id;

  	const query = {where: {id: userid}};
  	User.destroy(query)
  	.then(() => res.status(200).json({ message: "User Deleted"}))
	.catch((err) => res.status(500).json({error:err}));
	  
});

// -----  Admin Delete User  -----
router.delete("/:id", function (req, res) {

	const query = {where: {id: req.params.id}};
	User.destroy(query)
	.then(() => res.status(200).json({ message: "User Deleted"}))
  	.catch((err) => res.status(500).json({error:err}));
	
});
// router.delete("/:id", validateSession, function (req, res) {

// 	const query = {where: {id: req.params.id}};
// 	User.destroy(query)
// 	.then(() => res.status(200).json({ message: "User Deleted"}))
// 	.catch((err) => res.status(500).json({error:err}));
// });
module.exports = router;

