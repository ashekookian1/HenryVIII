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

    app.get("/Catherine-Howard", function(req, res) { // unnamed function is in between the {}s
        res.sendFile(path.join(__dirname + "/../client/html/Catherine Howard.html"))  //telling it the path to where the code is sitting
    });

    app.get("/Children", function(req, res) { // unnamed function is in between the {}s
        res.sendFile(path.join(__dirname + "/../client/html/Children.html"))  //telling it the path to where the code is sitting
    });

    app.get("/Edward-VI", function(req, res) { // unnamed function is in between the {}s
        res.sendFile(path.join(__dirname + "/../client/html/Edward VI.html"))  //telling it the path to where the code is sitting
    });

    app.get("/Elizabeth-I", function(req, res) { // unnamed function is in between the {}s
        res.sendFile(path.join(__dirname + "/../client/html/Elizabeth I.html"))  //telling it the path to where the code is sitting
    });

     app.get("/Family-Tree", function(req, res) { // unnamed function is in between the {}s
        res.sendFile(path.join(__dirname + "/../client/html/Family Tree.html"))  //telling it the path to where the code is sitting
    });
    app.get("/Henry-FitzRoy", function(req, res) { // unnamed function is in between the {}s
        res.sendFile(path.join(__dirname + "/../client/html/Henry FitzRoy.html"))  //telling it the path to where the code is sitting
    });

    app.get("/Jane-Seymour", function(req, res) { // unnamed function is in between the {}s
        res.sendFile(path.join(__dirname + "/../client/html/Jane Seymour.html"))  //telling it the path to where the code is sitting
    });

    app.get("/Katherine-of-Aragon", function(req, res) { // unnamed function is in between the {}s
        res.sendFile(path.join(__dirname + "/../client/html/Katherine of Aragon.html"))  //telling it the path to where the code is sitting
    });

    app.get("/Katherine-Parr", function(req, res) { // unnamed function is in between the {}s
        res.sendFile(path.join(__dirname + "/../client/html/Katherine Parr.html"))  //telling it the path to where the code is sitting
    });

    app.get("/Mary-I", function(req, res) { // unnamed function is in between the {}s
        res.sendFile(path.join(__dirname + "/../client/html/Mary I.html"))  //telling it the path to where the code is sitting
    });

    app.get("/People-He-Had-Killed", function(req, res) { // unnamed function is in between the {}s
        res.sendFile(path.join(__dirname + "/../client/html/People He Had Killed.html"))  //telling it the path to where the code is sitting
    });

    app.get("/Timeline", function(req, res) { // unnamed function is in between the {}s
        res.sendFile(path.join(__dirname + "/../client/html/Timeline.html"))  //telling it the path to where the code is sitting
    });

    app.get("/Wives-Main-Page", function(req, res) { // unnamed function is in between the {}s
        res.sendFile(path.join(__dirname + "/../client/html/Wives main page.html"))  //telling it the path to where the code is sitting
    });

    app.get("/Quiz", function(req, res) { // unnamed function is in between the {}s
        res.sendFile(path.join(__dirname + "/../client/html/Quiz.html"))  //telling it the path to where the code is sitting
    });

    app.get("/Admin", function(req, res) { // unnamed function is in between the {}s
        res.sendFile(path.join(__dirname + "/../client/html/Admin Page.html"))  //telling it the path to where the code is sitting
    });

     app.get("/quiz-questions-page", function(req, res) { // unnamed function is in between the {}s
        res.sendFile(path.join(__dirname + "/../client/html/quiz-questions-page.html"))  //telling it the path to where the code is sitting
    });
}

module.exports = router;

//once updated this page - must restart the server - so control c below, and then up arrow to get the command to restart it