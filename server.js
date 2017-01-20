// import express
const express = require ("express");

// set up express
const app = express();

// import path
const path = require ("path");

// import mailer
const mailer = require ("./mailer.js")

// import body-parser
const bodyParser = require("body-parser");

// set up body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// serve static files
app.use(express.static("assets"));

// ---------- ROUTES ---------- //

// route for the homepage
app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname + "/portfolio.html"));
});

// route for sending mail
app.post("/mail", (req, res) => {

	// prepare message to send
	let msg = `${req.body.name} sent you this message: \n\n${req.body.message}`;

	// send message via imported mailer
	mailer(req.body.email, msg, (data) => {
		res.send(data);
	});

});

// ---------- END ---------- //

// set up port
var PORT = 3001 || process.env.PORT;

// run server
app.listen(PORT, () => {
	console.log("Portfolio listening on port " + PORT);
});
