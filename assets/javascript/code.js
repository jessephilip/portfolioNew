//TODO: check out how the text color is changing. It gets screwy.

function getDimensions() {
    console.log("Width: " + window.innerWidth + ", Height: " + window.innerHeight);
}

let height = window.innerHeight;
let width = window.innerWidth;
let main = document.getElementById("main");
let video = document.getElementById("video");
video.style.height = height + "px";
//main.style.height = height + "px";
//main.style.width = width + "px";

var anchors = document.getElementsByTagName("a");
for (var i = 0; i < anchors.length; i++) {
    anchors[i].style.cursor = "pointer";
}

var socialLinks = document.getElementsByClassName("fa-3x");
for (i = 0; i < socialLinks.length; i++) {
    socialLinks[i].style.cursor = "pointer";
}

// getDimensions();

// click listeners

// click listener for the about me section
var aboutMeButton = document.getElementsByClassName("aboutMe");

// click listener for the portfolio section
var portfolioButton = document.getElementsByClassName("portfolio");

// click listener for the contact section
var contactButton = document.getElementsByClassName("contactMe");

for (var i = 0; i < aboutMeButton.length; i++) {
    aboutMeButton[i].addEventListener("click", loadAboutMe);
    portfolioButton[i].addEventListener("click", loadPortfolio);
    contactButton[i].addEventListener("click", loadContact);
}

// event listeners
$(".brand-image").mouseover(colorifyPicture);
$(".brand-image").mouseout(blackAndWhiteify);

// functions

// function for the aboutMeButton (About Me Section)
function loadAboutMe() {
	$('html,body').scrollTop(0);
	$("html").css("overflow-y", "scroll");
    let aboutMeSection = document.getElementById("aboutMeSection");
    let intro = document.getElementById("intro");
	$("#title-text").css("height", window.innerHeight);
	$("#dialogue-text").css("margin-top", (window.innerHeight / 4));
	$("#resumeDiv").css("margin-top", (window.innerHeight / 4));
	$("#techArticle").css("margin-top", (window.innerHeight / 4));
    intro.className = "fadeOut";
	portfolioSection.className = "fadeOut";
	contactSection.className = "fadeOut";
    aboutMeSection.style.display = "initial";
    aboutMeSection.className = "fadeIn";
	portfolioSection.style.zIndex = 0;
	contactSection.style.zIndex = 0;
	aboutMeSection.style.zIndex = 1;

}

function loadPortfolio() {
	$('html,body').scrollTop(0);
	$("html").css("overflow-y", "hidden");
    var portfolioSection = document.getElementById("portfolioSection");
    var intro = document.getElementById("intro");
	$("#portfolioSection").css("height", window.innerHeight);
    intro.className = "fadeOut";
	aboutMeSection.className = "fadeOut";
	contactSection.className = "fadeOut";
    portfolioSection.style.display = "initial";
    portfolioSection.className = "fadeIn";
	portfolioSection.style.zIndex = 1;
	contactSection.style.zIndex = 0;
	aboutMeSection.style.zIndex = 0;

	getDimensions();
}

function loadContact() {
	$('html,body').scrollTop(0);
	$("html").css("overflow-y", "hidden");
    var contactSection = document.getElementById("contactSection");
    var intro = document.getElementById("intro");
    intro.className = "fadeOut";
	portfolioSection.className = "fadeOut";
	aboutMeSection.className = "fadeOut";
    contactSection.style.display = "initial";
    contactSection.className = "fadeIn";
	portfolioSection.style.zIndex = 0;
	contactSection.style.zIndex = 1;
	aboutMeSection.style.zIndex = 0;

	getDimensions();
}

// this function replaces the black and white profile picture with the full color one
function colorifyPicture() {
    console.log("colorify");
    $(".brand-image").attr("src", "images/main-profile.jpg");
}

function blackAndWhiteify() {
    console.log("blackandwhiteify");
    $(".brand-image").attr("src", "images/main-profile-bw.jpg");
}

var portfolioArray = document.getElementsByClassName("portfolioPic")
for (var i = 0; i < portfolioArray.length; i++) {
    portfolioArray[i].style.cursor = "pointer";
}

// click listener
$(".portfolioPic").mouseover(pictureSwitch);
$(".portfolioPic").mouseout(pictureSwitch);

// this function will change the portfolio picture from black and white to color
function pictureSwitch() {

    // variable to determine which portfolio div is hovered over
    let id = $(this).children("img").data("value");
	console.log(id);

    // conditional to change the color of the project title. if red make right and vice versa.
    if ($(this).children("h4").css("color") === "rgb(128, 128, 128)") {
        $(this).children("h4").css("color", "white");
    } else
        $(this).children("h4").css("color", "grey");

    // variable to hold image source tag
    let imgSrc;

    // variable for the preface of the image source tag
    let loc = "images/";

    // variable pointing to the img element in the div
    let imgTag = $(this).children("img");

    // if img src has "_bw" change the img src to the color image and vice versa
    if (imgTag.attr("src").indexOf("_bw") === -1) {
        imgSrc = $(this).data("bw");
        imgTag.attr("src", portfolio[id].photo_small_bw);
    } else {
        imgSrc = $(this).data("color");
        imgTag.attr("src", portfolio[id].photo_small);
    }
}

// clickfunction for clicking on a portfolio project picture. loads a sweetalert modal
$(".portfolioPics").on("click", (e) => {
    let target = e.target.alt;
    let id = target.split(" ", 1);
    id = id.join();
    console.log(portfolio[id]);

    $('#exampleModal').modal();
    let titleLoc = $("#modalTitle");
    titleLoc.text(portfolio[id].name);

    let imgLoc = $("#modalImg");
    imgLoc.attr("src", portfolio[id].photo);
    imgLoc.attr("alt", portfolio[id].name + " color image.");

    $("#modalList").html("");

    // create an <li> element to add the technologies text
    let techLi = $("<li>");

    // prepare technologies array for modal by converting to string
    let tech = portfolio[id].tech.join();
    tech = tech.replace(/,/g, ", ");
    techLi.text("Technologies: " + tech);

    // append to the <ul> element
    $("#modalList").append(techLi);

    // conditional to see if npm packages are present
    if (portfolio[id].hasOwnProperty("npm")) {
        if (portfolio[id].npm.length > 0) {

            // create an <li> element to add the npm text
            let npmLi = $("<li>");

            // manipulate the npm array to be presentable on the modal as a string
            let npm = portfolio[id].npm.join();
            npm = npm.replace(/,/g, ", ");
            npmLi.text("NPM Packages: " + npm);

            // append that element to the modal list
            $("#modalList").append(npmLi);
        }
    }

    $("#modalDesc").text(portfolio[id].description);

    $("#modalGithub").attr("href", portfolio[id].github);

    $("#modalHeroku").attr("href", portfolio[id].heroku);

});

// clicklistener to send mailer
$("#sendButton").on("click", () => {

	// get user input values
	let name = $("#nameInput").val().trim();
	let email= $("#emailInput").val().trim();
	let message = $("#messageInput").val().trim();

	// ajax call to send user's input and send mail
	$.ajax({
		url: '/mail',
		type: 'POST',
		data: {name: name, email: email, message: message}
	})
	.done(function(data) {

		// send comfirmation alert
		vex.dialog.alert("Thank you for sending me a message! I'll get back to you soon.");

		// clear user inputs
		$("#nameInput").val("");
		$("#emailInput").val("");
		$("#messageInput").val("");

	})
	.fail(function() {
		vex.dialog.alert("Oops. Something went wrong. Please try again.");
	});
});
