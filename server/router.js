const path = require("path");

//function to hold all our page listeners
var router = function(app) {
    app.get("/", function(req, res) { // unnamed function is in between the {}s
        res.sendFile(path.join(__dirname + "/../client/html/homepage.html"))  //telling it the path to where the code is sitting
    });

    app.get("/overview", function(req, res) { // unnamed function is in between the {}s
        res.sendFile(path.join(__dirname + "/../client/html/overviewpage.html"))  //telling it the path to where the code is sitting
    });

    app.get("/Anne-Boleyn", function(req, res) { // unnamed function is in between the {}s
        res.sendFile(path.join(__dirname + "/../client/html/Anne Boleyn.html"))  //telling it the path to where the code is sitting
    });

    app.get("/Anne-of-Cleves", function(req, res) { // unnamed function is in between the {}s
        res.sendFile(path.join(__dirname + "/../client/html/Anne of Cleves.html"))  //telling it the path to where the code is sitting
    });
}

module.exports = router;

//once updated this page - must restart the server - so control c below, and then up arrow to get the command to restart it