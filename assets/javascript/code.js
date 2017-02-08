//TODO: add validator for email validation
//TODO: fix mobile responsiveness
//TODO: fix for other browsers
//TODO: if browser cannot play video, have it show an image instead

// affix resume link to all relevant links
$(".resume").attr("href", portfolio.resume.url);

// check if browser can play video
if (!!document.createElement('video').canPlayType === true) {
    // run some code that relies on HTML5 video
    //console.log("can play");
} else {
    // do something else
    //console.log("can't play");
}

// on startup, load the about me section
loadAboutMe();

document.getElementById("dropdown").addEventListener("click", function(e) {
	var pos = document.getElementById("dropdown").getBoundingClientRect();
	//console.log("pos: ", pos);

	var left = pos.left;
	document.getElementById('menu').style.left = left + "px";
});


// function for loading the aboutMeSection
function loadAboutMe() {

    // locator for the about me section
    var aboutMeSection = document.getElementById("aboutMeSection");

    $('html,body').scrollTop(0);
    $("#title-text").css("height", window.innerHeight);
    $("#dialogue-text").css("margin-top", (window.innerHeight / 4));
    $("#resumeDiv").css("margin-top", (window.innerHeight / 4));
    $("#techArticle").css("margin-top", (window.innerHeight / 4));
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
    var portfolioSection = document.getElementById("portfolioSection");
    $("#portfolioSection").css("height", window.innerHeight);
    aboutMeSection.className = "fadeOut";
    contactSection.className = "fadeOut";
    portfolioSection.style.display = "initial";
    portfolioSection.className = "fadeIn";
    portfolioSection.style.zIndex = 1;
    contactSection.style.zIndex = 0;
    aboutMeSection.style.zIndex = 0;
}

function loadContactMe() {
    $('html,body').scrollTop(0);
    var contactSection = document.getElementById("contactSection");
    portfolioSection.className = "fadeOut";
    aboutMeSection.className = "fadeOut";
    contactSection.style.display = "initial";
    contactSection.className = "fadeIn";
    portfolioSection.style.zIndex = 0;
    contactSection.style.zIndex = 1;
    aboutMeSection.style.zIndex = 0;
}

// clickfunction for clicking on a portfolio project picture. loads a bootstrap modal
$(".portfolioPics").on("click", function(e) {

    // get the alternate tag from the clicked item
    var target = e.target.alt;

    // split the string once and keep the first split
    var id = target.split(" ", 1);
    id = id.join();

    // show the modal
    $('#modalTemplate').modal();

    // set the modal's title to the name in the portfolio object
    var titleLoc = $("#modalTitle");
    titleLoc.text(portfolio[id].name);

    // set the img to the src in the portfolio object
    var imgLoc = $("#modalImg");
    imgLoc.attr("src", portfolio[id].photo);
    imgLoc.attr("alt", portfolio[id].name + " color image.");

    // clear out any list items that may have previously been on the modal
    $("#modalList").html("");

    // create an <li> element to add the technologies text
    var techLi = $("<li>");

    // prepare technologies array for modal by converting to string
    var tech = portfolio[id].tech.join();
    tech = tech.replace(/,/g, ", ");
    techLi.text("Technologies: " + tech);

    // append to the <ul> element
    $("#modalList").append(techLi);

    // conditional to see if npm packages are listed in the portfolio object
    if (portfolio[id].hasOwnProperty("npm")) {
        if (portfolio[id].npm.length > 0) {

            // create an <li> element to add the npm text
            var npmLi = $("<li>");

            // manipulate the npm array to be presentable on the modal as a string
            var npm = portfolio[id].npm.join();
            npm = npm.replace(/,/g, ", ");
            npmLi.text("NPM Packages: " + npm);

            // append that element to the modal list
            $("#modalList").append(npmLi);
        }
    }

    // set text for the description of the modal as written in the portfolio object
    $("#modalDesc").text(portfolio[id].description);

    // set the github href for the modal as provided in the portfolio object
    $("#modalGithub").attr("href", portfolio[id].github);

    // set the heroku href for the modal as provided in the portfolio object
    $("#modalHeroku").attr("href", portfolio[id].heroku);

});

// clicklistener to send mailer
$("#sendButton").on("click", function() {

    // get user input values
    var name = $("#nameInput").val().trim();
    var email = $("#emailInput").val().trim();
    var message = $("#messageInput").val().trim();

    // ajax call to send user's input and send mail
    $.ajax({
        url: '/mail',
        type: 'POST',
        data: {
            name: name,
            email: email,
            message: message
        }
    }).done(function(data) {

        // send comfirmation alert
        vex.dialog.alert("Thank you for sending me a message! I'll get back to you soon.");

        // clear user inputs
        $("#nameInput").val("");
        $("#emailInput").val("");
        $("#messageInput").val("");

    }).fail(function() {
        vex.dialog.alert("Oops. Something went wrong. Please try again.");
    });
});
