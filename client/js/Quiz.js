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
        alert("Result: " + data.msg);
        if(data.msg === "SUCCESS") { 
            questions = data.questionData;
           console.log("random questions: ",data.questionData)
           getAnswers(questions[0].question_id)
        }
    })
    .catch(error => {
        alert("Unable to connect to server!:  " + error);  
    });       

}


// call get answers function and send it the first ? id in the array

function getAnswers(qID){
fetch("http://localhost:5000/get-answers", { 
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        
    })
    .then(response => {  // sending the response to an unnamed function
        
        if(!response.ok){ // if response is not ok, then throw the below error message
            throw new Error("Server returned an error!: " + response.statusText);
        }

       return response.json= {
        question_id: qID,
        textAnswers: answerTextArray,
        correct_ans: radioButtonChoiceArray
    };
    })

    .then(data => {
        alert("Result: " + data.msg);
        if(data.msg === "SUCCESS") { 
           answers = data.answerData;
           console.log("answer options: ",data.answerData)
           getAnswers(answers[0].answer_id, answer, correct_ans)
        }
    })

    .catch(error => {
        alert("Unable to connect to server!:  " + error);  
    });       
}



   
    