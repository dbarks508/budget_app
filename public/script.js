// global variables
const questionElement = document.getElementById("questionElement");
const answerElement = document.getElementById("answerElement");
const submitButton = document.getElementById("submitButton");

const changeQuestion = () => {
    
        questionElement.innerHTML = "poop";
        answerElement.value = "";
    
}

const eventListeners = () => {

    if (submitButton.addEventListener) { 
        submitButton.addEventListener("click", changeQuestion, false); 
    }
    
}

const init = () => {
    eventListeners();
}

// event listener
if (window.addEventListener)
{ window.addEventListener("load", init, false); }