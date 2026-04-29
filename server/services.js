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
            if (err) return res.json({msg: "Error: " + err});

            console.log(result.insertId)
            return res.json({msg: "SUCCESS", questionID: result.insertId}); // gets spells array back and it populates the table 
       
        });

    }); 

    
    app.post("/write-answers", async function(req, res) { // the listener called write question

        var question_id = req.body.question_id;
        var answer_text = req.body.textAnswers;
        var correct_answers = req.body.correct_ans;

       var insertData = [];

        for (let i = 0; i < answer_text.length; i++) {
            let tempArray = [question_id, answer_text[i], correct_answers[i]];
            insertData.push(tempArray);
        }


        console.log(JSON.stringify(insertData))
        
        
        con.query("INSERT INTO answer_table (question_id, answer, correct_ans) VALUES ?",  [insertData], function (err, result) { 
            if (err) return res.json({msg: "Error: " + err});

            console.log(result.insertId)
            return res.json({msg: "SUCCESS"}); // gets questions array back and it populates the table 
       
        });

    }); 
    

    app.get("/get-questions", async function(req, res) {
            
       
        con.query("SELECT * FROM quiz_questions ORDER BY RAND() LIMIT 5", function (err, result) {
            if (err) return res.json({msg: "Error: " + err});
            // console.log("random questions: ",result);
            return res.json({msg: "SUCCESS", questionData: result});  
        });
    });



app.get("/get-answers", async function(req, res) {
            

       // step 1. get the ?id from the request.body
         var question_id = req.query.questionID
         console.log("question id: ", question_id);
       
       //step 2. execute the query
        con.query("SELECT * FROM answer_table where question_id = ?", question_id, function (err, result) { // change select statement
             if (err) return res.json({msg: "Error: " + err});
             // console.log("answers: ",result);
             return res.json({msg: "SUCCESS", answerData: result});  


        });
// capture ?ID and do a select statement for the answers table - returns all 4 answers - display them as answers in the console log
     });

     

}

module.exports = services; 


        