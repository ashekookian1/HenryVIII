
const submitButton = document.getElementById("submit");
submitButton.addEventListener("click", function(event) {
    // alert("Submit Button Pushed");
event.preventDefault();

    // grab the 10 pieces of info. from the admin page and put them here

    var question = document.getElementById("quiz_questions").value;
    var points = document.getElementById("points").value;
    
    var answerOne = document.getElementById("answerOne").value;
    var answerTwo = document.getElementById("answerTwo").value;
    var answerThree = document.getElementById("answerThree").value;
    var answerFour = document.getElementById("answerFour").value;
    var choiceOne = document.getElementById("choiceOne").checked;
    var choiceTwo = document.getElementById("choiceTwo").checked;
    var choiceThree = document.getElementById("choiceThree").checked;
    var choiceFour = document.getElementById("choiceFour").checked;
    var correct = choiceOne || choiceTwo || choiceThree || choiceFour

    console.log("choices: ", choiceOne,"; ", choiceTwo,"; ", choiceThree,"; ", choiceFour)
    console.log("correct = ", correct)


// grab the 10 pieces of info. from the admin page and put them here
   if(!question || !points || !answerOne || !answerTwo || !answerThree 
       || !answerFour || !correct) {
       alert("Please fill in all data fields before submitting!"); 
       return;
   }

if(points < 1 || points > 10 ) 
       {
       alert("Please enter a value between 1 - 10!"); 
       return;
   }

    var jsonObject = {
        question: question,   // left of the colon is the variable name, 
        // right of it is the actual value - it will get and save the variable when you type it in on the enter data page
        points: points,
    };

  console.log(jsonObject)

 

    //Send data through a fetch
  fetch("http://localhost:5000/write-question", { // has to match the listener called write question on the services.js page
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(jsonObject)
    })
    .then(response => {  // sending the response to an unnamed function
        
        if(!response.ok){ // if response is not ok, then throw the below error message
            throw new Error("Server returned an error!: " + response.statusText);
        }

        return response.json();
    })
    .then(data => {
        if(data.msg === "SUCCESS") { 
            console.log("Question ID: ", data.questionID)
          saveAnswers(data.questionID);
        }
    })
    .catch(error => {
        alert("Unable to connect to server!:  " + error);  
    });       


});

function saveAnswers(qID) {
    var answerOne = document.getElementById("answerOne").value;
    var answerTwo = document.getElementById("answerTwo").value;
    var answerThree = document.getElementById("answerThree").value;
    var answerFour = document.getElementById("answerFour").value;
   
    var choiceOne = document.getElementById("choiceOne").checked;
    var choiceTwo = document.getElementById("choiceTwo").checked;
    var choiceThree = document.getElementById("choiceThree").checked;
    var choiceFour = document.getElementById("choiceFour").checked;
    
    console.log("answerOne: ", answerOne);
    console.log("answer one correct: ", choiceOne);

    console.log("answerTwo: ", answerTwo);
    console.log("answer two correct: ", choiceTwo);

    console.log("answerThree: ", answerThree);
    console.log("answer three correct: ", choiceThree);

    console.log("answerFour: ", answerFour);
    console.log("answer four correct: ", choiceFour);

    var radioButtonChoiceArray = [choiceOne, choiceTwo, choiceThree, choiceFour];

    var answerTextArray = [answerOne, answerTwo, answerThree, answerFour];

    var jsonObject = {
        question_id: qID,
        textAnswers: answerTextArray,
        correct_ans: radioButtonChoiceArray
    };

   fetch("http://localhost:5000/write-answers", { // has to match the listener called write question on the services.js page
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(jsonObject)
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
            clearFormAfterSavingData();
        }
    })
    .catch(error => {
        alert("Unable to connect to server!:  " + error);  
    });       


} //end of save answers function

const clearButton = document.getElementById("Clear");
clearButton.addEventListener("click", function(event) {

   event.preventDefault();
   
   // var question = document.getElementById("question");

   clearFormAfterSavingData();

}); // end of listener for clear button

function clearFormAfterSavingData(){
document.getElementById("quiz_questions").value = "";
   document.getElementById("points").value = "";
   document.getElementById("answerOne").value = "";
   document.getElementById("answerTwo").value = "";
   document.getElementById("answerThree").value = "";
   document.getElementById("answerFour").value = "";
   document.getElementById("choiceOne").checked = false;
   document.getElementById("choiceTwo").checked = false;
   document.getElementById("choiceThree").checked = false;
   document.getElementById("choiceFour").checked = false;
}