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
    var choiceOne = document.getElementById("choiceOne").value;
    var choiceTwo = document.getElementById("choiceTwo").value;
    var choiceThree = document.getElementById("choiceThree").value;
    var choiceFour = document.getElementById("choiceFour").value;
    var correct = choiceOne || choiceTwo || choiceThree || choiceFour



// grab the 10 pieces of info. from the admin page and put them here
   if(!question || !points || !answerOne || !answerTwo || !answerThree 
       || !answerFour || !correct) {
       alert("Please fill in all data fields before submitting!"); 
       return;
   }

    var jsonObject = {
        question: question,   // left of the colon is the variable name, 
        // right of it is the actual value - it will get and save the variable when you type it in on the enter data page
        points: points,
    }
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
        console.log("It worked on the client side.");
        if(!response.ok){ // if response is not ok, then throw the below error message
            throw new Error("This is an error message from the client side. " + response.statusText);
        }

        return response.json();
    })
    .then(data => {
        alert("Result: " + data.msg);
        if(data.msg === "SUCCESS") { 
            console.log("Question ID: ", data.questionID)
           saveAnswers(data.questionID);
        }
    })
    .catch(error => {
        alert("This is another error message from the client side. " + error);  
    });       
});

function saveAnswers(qID) {
    var answerOne = document.getElementById("answerOne").value;
    var answerTwo = document.getElementById("answerTwo").value;
    var answerThree = document.getElementById("answerThree").value;
    var answerFour = document.getElementById("answerFour").value;
    // var correct = ?

    
    console.log("answerOne: ", answerOne);
    console.log("answerTwo: ", answerTwo);
    console.log("answerThree: ", answerThree);
    console.log("answerFour: ", answerFour);

    if (document.getElementById("choiceOne").checked)
        console.log("true") 
    else console.log("false");

    if (document.getElementById("choiceTwo").checked)
        console.log("true") 
    else console.log("false");

    if (document.getElementById("choiceThree").checked)
        console.log("true") 
    else console.log("false");
    
    if (document.getElementById("choiceFour").checked)
        console.log("true") 
    else console.log("false");
}

const clearButton = document.getElementById("Clear");
clearButton.addEventListener("click", function(event) {

   event.preventDefault();
   
   // var question = document.getElementById("question");

   document.getElementById("quiz_questions").value = "";
   document.getElementById("points").value = "";
   document.getElementById("answerOne").value = "";
   document.getElementById("answerTwo").value = "";
   document.getElementById("answerThree").value = "";
   document.getElementById("answerFour").value = "";
});