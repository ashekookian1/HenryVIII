var questions = [];

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
           getAnswers(questions[0].question_id,0)
        }
    })
    .catch(error => {
        alert("Unable to connect to server!:  " + error);  
    });       

}

var answers = [];

// call get answers function and send it the first ? id in the array

function getAnswers(qID,index){
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
        alert("Result: " + data.msg);
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
   
   console.log("submit button pressed");
   alert("submit button pressed");

   checkAnswers();

}); 

function checkAnswers(){
   // document.getElementById("quiz_questions").value = "";
   document.getElementById("points").value = "";
   // document.getElementById("answerOne").value = "";
   // document.getElementById("answerTwo").value = "";
  // document.getElementById("answerThree").value = "";
  // document.getElementById("answerFour").value = "";
   document.getElementById("choiceOne").checked = false;
   document.getElementById("choiceTwo").checked = false;
   document.getElementById("choiceThree").checked = false;
   document.getElementById("choiceFour").checked = false;
}

var radioButtonChoiceArray = [choiceOne, choiceTwo, choiceThree, choiceFour];

    var answerTextArray = [answerOne, answerTwo, answerThree, answerFour];

    var jsonObject = {
        question_id: qID,
        textAnswers: answerTextArray,
        correct_ans: radioButtonChoiceArray
    };

    