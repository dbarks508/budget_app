// global variables
const questionElement = document.getElementById("questionElement");
const answerElement = document.getElementById("answerElement");
const submitButton = document.getElementById("submitButton");
const loginButton = document.getElementById("loginButton");
let count = 1; 
const entryList = [];

class Person {
    constructor(fname, income, rent, car, insurance, subscriptions, phone) {
        this.fname = fname;
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
    let entry = answerElement.value;
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
            questionElement.innerHTML = 'Thank you for your input!';
            answerElement.value = "";
            count ++
            const user = new Person(entryList[0], entryList[1], entryList[2], entryList[3], entryList[4], entryList[5], entryList[6]);
            addExpense(user);
            break;
        default:
            questionElement.innerHTML = 'Thank you for your input!';
            answerElement.value = "";
    }
}

const chooseSlider = (count) => {
    
}

async function addExpense(user) {
    console.log(user.fname, user.income, user.rent, user.car, user.insurance, user.subscriptions, user.phone);

    fetch("http://localhost:3000/expense", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
         fname: user.fname,
         income: user.income,
         rent: user.rent,
         car: user.car,
         insurance: user.insurance,
         subscriptions: user.subscriptions,
         phone: user.phone        
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
if (window.addEventListener){ 
    window.addEventListener("load", init, false); 
}