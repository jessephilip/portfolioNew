// import express
let express = require ("express");

// set up express
let app = express();

// import path
let path = require ("path");

// import mailer
let mailer = require ("./mailer.js");

// import body-parser
let bodyParser = require("body-parser");

// set up body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// serve static files
app.use(express.static("assets"));

// ---------- ROUTES ---------- //

// route for the homepage
app.get("/", (req, res) => res.sendFile(path.join(__dirname + "/portfolio.html")));

// route for sending mail
app.post("/mail", (req, res) => {

	// prepare message to send
	let msg = `${req.body.name} sent you this message: \n\n${req.body.message}`;

	// send message via imported mailer
	mailer(req.body.email, msg, data => res.send(data));
});

// ---------- END ---------- //

const PORT = process.env.PORT || 3000;

// run server
app.listen(PORT, () => console.log(`Portfolio is up and running on Port: ${PORT}.`));
