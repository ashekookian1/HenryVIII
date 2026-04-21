//Bring in SQL
let mysql = require('mysql2');

let con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "vampire1",
  database: "henry_viii"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

var services = function(app) {
    // all db listeners are in here
    app.post("/write-question", async function(req, res) { // the listener called write question

        var questionData = { //has ? and pts. only - so 2 values
            question: req.body.question,
            points: req.body.points,
        };


        console.log(JSON.stringify(questionData))
        
        
        con.query("INSERT INTO quiz_questions SET ?",  questionData, function (err, result) { 
            if (err) throw err;
            console.log(result.insertId)
            return res.json({msg: "SUCCESS", questionID: result.insertId}); // gets spells array back and it populates the table 
       
        });

    }); 
    

    app.get("/get-records", async function(req, res) {
        
        const orderBy = {bookTitle: 1};        // order it by name - in the name field

        //2.  Connect, find data, close database, return results or error
        try {
            const conn = await client.connect(); // connect to the Mongo server
            const db = conn.db("library"); // connect to the Mongo db desired
            const coll = db.collection("bookTable"); // connect to the collection in the db desired

            const books = await coll.find().sort(orderBy).toArray();

            await conn.close();

            return res.json({msg: "SUCCESS", libraryData: books}); // gets spells array back and it populates the table 
        } catch(err) {
            return res.json({msg: "Error: " + err});
        }

    });

}

module.exports = services;