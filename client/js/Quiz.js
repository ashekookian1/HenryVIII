var questions = [];

var answers = [];

var score = 0;

var index = 0;

var totalPoints = 0;


getQuestions();
function getQuestions(){
fetch("http://localhost:5000/get-questions", { // has to match the listener called write question on the services.js page
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    })

    .then(response => {  // sending the response to an unnamed function
        
        if(!response.ok){ // if response is not ok, then throw the below error message
            throw new Error("Server returned an error!: " + response.statusText);
        }

        return response.json();

    })

    .then(data => {
        // alert("Result: " + data.msg);
        if(data.msg === "SUCCESS") { 
            questions = data.questionData;
           console.log("random questions: ",data.questionData)
           getAnswers(questions[index].question_id)
        }
    })
    .catch(error => {
        alert("Unable to connect to server!:  " + error);  
    });       

}


// call get answers function and send it the first ? id in the array

function getAnswers(qID){
    var jsonObject = {
        questionID: qID
    }
    fetch(`http://localhost:5000/get-answers?questionID=${qID}`, { 
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }, 
       // params: JSON.stringify(jsonObject)
        
    })
    .then(response => {  // sending the response to an unnamed function
    
        
        if(!response.ok){ // if response is not ok, then throw the below error message
            throw new Error("Server returned an error!: " + response.statusText);
        }

              return response.json();

    })

    .then(data => {
       // alert("Result: " + data.msg);
        if(data.msg === "SUCCESS") { 
           answers = data.answerData;
           console.log("answer options: ",data.answerData)
           paintScreen(index)
        }
    })

    .catch(error => {
        alert("Unable to connect to server!:  " + error);  
    });   

}

function paintScreen(index){
    var questionElement = document.getElementById("question_id");
    questionElement.innerHTML = "<center><br>" + questions[index].question + "</center>";

    var answerElement = document.getElementById("answer0");
    answerElement.innerHTML = "<center>" + answers[0].answer + "</center>";

    var answerElement = document.getElementById("answer1");
    answerElement.innerHTML = "<center>" + answers[1].answer + "</center>";

    var answerElement = document.getElementById("answer2");
    answerElement.innerHTML = "<center>" + answers[2].answer + "</center>";

    var answerElement = document.getElementById("answer3");
    answerElement.innerHTML = "<center>" + answers[3].answer + "</center>";
}



// submit button listener

   const submitButton = document.getElementById("submit");
   submitButton.addEventListener("click", function(event) {

   event.preventDefault();

   checkAnswers();

}); 

function checkAnswers(){
   
   const selectedValue = document.querySelector('input[name="answerOption"]:checked')?.value;
   console.log("correct: ",(answers[selectedValue].correct_ans===1) );
   totalPoints = totalPoints + questions[index].points;
    if (answers[selectedValue].correct_ans===1) {
// if answer is correct 
    score = score + questions[index].points;
    alert("Correct!  Your score is: " + score + " out of " + totalPoints);
// do this code - js popup correct and increase score and show it on popup - 2 lines of code

// increase the points by: questions[index].points
    } else {
        score;
alert("Sorry, incorrect. Your score is: " + score + " out of " + totalPoints);
//alert("Your score is: ", score);
// do this code - 1 line

    }
    bringNextQuestion();
}


// next button listener 

// const next_question = document.getElementById("next_question");
//    next_question.addEventListener("click", function(event) {

//     console.log("next button clicked");

//    event.preventDefault();

//    bringNextQuestion();

// }); 
    

function bringNextQuestion(question_id){
 index = index + 1;
 if (index > 4) {
    alert ("Quiz Finished!")
 } else {
    getAnswers(questions[index].question_id)
 }
}