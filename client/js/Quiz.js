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
    var points = (questions[index].points>1) ? "Points":"Point" 
    var questionHeader = document.getElementById("questionHeader");
    questionHeader.innerHTML = "<center><b>Question (" + questions[index].points + " "+ points + "):</b></center>"; 

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

const modal = document.getElementById("quizModal");
const modalIcon = document.getElementById("modal-icon");
const modalTitle = document.getElementById("modal-title");
const modalScore = document.getElementById("modal-score");
const quizEndModalTitle = document.getElementById("quiz-end-modal-title");

function checkAnswers(){
   
   const selectedValue = document.querySelector('input[name="answerOption"]:checked')?.value;
   console.log("correct: ",(answers[selectedValue].correct_ans===1) );
   totalPoints = totalPoints + questions[index].points;
    if (answers[selectedValue].correct_ans===1) {

        // if answer is correct 
    score = score + questions[index].points;
    
    showModal(true, `Correct! Your score is: ${score} out of ${totalPoints}`);
// do this code - js popup correct and increase score and show it on popup - 2 lines of code

// increase the points by: questions[index].points
    } else {
        showModal(false, `Sorry, incorrect. Your score is: ${score} out of ${totalPoints}`);
//alert("Your score is: ", score);
// do this code - 1 line

    }
    
}

function showModal(isCorrect, message) {
     document.getElementById("submit").disabled = true;
         modal.style.display = "flex"; 
document.getElementById("choiceOne").disabled = true;
document.getElementById("choiceTwo").disabled = true;
document.getElementById("choiceThree").disabled = true;
document.getElementById("choiceFour").disabled = true;

    modalIcon.innerHTML = isCorrect ? "✓" : "✕";
    modalIcon.className = isCorrect ? "correct" : "incorrect";
    modalTitle.innerText = isCorrect ? "Well Done!" : "Incorrect";
    modalScore.innerText = message;
    // modal.classList.remove("modal-hidden");
    //       modal.classList.add("modal-visible");
    modal.className = "modal-visible"; // Show modal
     
}

function closeModal() {
        modal.style.display = "none"; 
    modal.className = "modal-hidden";
    bringNextQuestion();
    document.getElementById("submit").disabled = false;
    document.getElementById("choiceOne").disabled = false;
    document.getElementById("choiceTwo").disabled = false;
    document.getElementById("choiceThree").disabled = false;
    document.getElementById("choiceFour").disabled = false;

}

function quizFinishedModal (message) {
    
    showModal()
    quizEndModalTitle.innerText = "<b>Quiz Finished!</b>  Do you want to retake the quiz or do you want to go back to the site homepage?";
    // modalScore.innerText = message;
    // modal.className = "modal-visible"; 
    modal.style.display = "flex"; 
}

// Ensure this calls closeModal instead of alert
function bringNextQuestion(){
    modal.className = "modal-hidden";
    index = index + 1;
    if (index > 4) { quizFinishedModal()  // You can make this a modal too
    } else {
        getAnswers(questions[index].question_id);
    }
}

// Added handler for the 'Next Question' button inside the modal
function nextQuestionAction() {
    closeModal();
}