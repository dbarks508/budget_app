// global variables
const questionElement = document.getElementById("questionElement");
const answerElement = document.getElementById("answerElement");
const submitButton = document.getElementById("submitButton");
const loginButton = document.getElementById("loginButton");
let count = 1; 
const entryList = [];
let entry;

class Person {
    constructor(name, income, rent, car, insurance, subscriptions, phone) {

        this.name;
        this.income = income;
        this.rent = rent;
        this.car = car;
        this.insurance = insurance;
        this.subscriptions = subscriptions;
        this.phone = phone;
    }
}

// changes questions for income and expenses
const changeQuestion = () => {
    console.log(`passing through changeQuestion() || count = ${count}`)

    entry = answerElement.value;
    entryList.push(entry);

    switch (count) {
        case 1:
            questionElement.innerHTML =  "Total monthly income ($): ";
            answerElement.value = "";
            count ++;
            break;
        case 2:
            questionElement.innerHTML =  "Monthly rent ($): ";
            answerElement.value = "";
            count ++;
            break;
        case 3:
            questionElement.innerHTML =  "Monthly car payment ($): ";
            answerElement.value = "";
            count ++;
            break;
        case 4:
            questionElement.innerHTML =  "Monthly car insurance ($): ";
            answerElement.value = "";
            count ++;
            break;
        case 5:
            questionElement.innerHTML =  "Monthly total subscriptions ($): ";
            answerElement.value = "";
            count ++;
            break;
        case 6:
            questionElement.innerHTML =  "Monthly phone bill ($): ";
            answerElement.value = "";
            count ++;
            break;
        case 7: 
        console.log(entryList);

        const user = new Person(entryList[0], entryList[1], entryList[2], entryList[3], entryList[4], entryList[5]);
        saveUser(user);
        break;
    }
}

const saveUser = (user) => {
    console.log(`name: ${user.name} || income: ${user.income}`);
}

const chooseSlider = (count) => {
    
}

const postLogin = () => {
    fetch(`http://${port}/transactions`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
     // stuuufffff
    }),
  })
    .then((response) => response.json())
    .then((response) => console.log(JSON.stringify(response)));
}

const eventListeners = () => {
    if (submitButton.addEventListener) { 
        submitButton.addEventListener("click", changeQuestion, false); 
    }
    if (loginButton.addEventListener) {
        loginButton.addEventListener("click", postLogin, false);
    }
}

const init = () => {
    eventListeners();
}

// event listener
if (window.addEventListener)
{ window.addEventListener("load", init, false); }