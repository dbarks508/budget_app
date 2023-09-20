const loginButton = document.getElementById("loginButton");
const registerButton = document.getElementById("registerButton");

const usernameElement = document.getElementById("loginItem1");
const passwordElement = document.getElementById("loginItem2");
const errorDiv = document.getElementById("errorDiv");


// add first name as username 
const validateUsername = () => {
    let username  = sessionStorage['fname'];
    console.log('the sessionstorage username is: ', username);

    if(username !== undefined){
        usernameElement.value = username;
        usernameElement.disabled = true;
    } else {
        usernameElement.disabled = false;
    }
}

// add a new user to the db
const addUser = () => {
    let username = usernameElement.value;
    let password = passwordElement.value;

    
    fetch("http://localhost:3000/addUser", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: username,
            password: password,
        }),
      })
        .then((response) => response.json())
        .then((success) => {
            if(!success) {
                errorDiv.innerHTML = "User already exists";
                usernameElement.disabled = false;
            } else {
                errorDiv.innerHTML = "User successfully added";
                usernameElement.disabled = false;
            }
        })
        .catch((error) => {
            console.error("Fetch error: ", error);
        });

        usernameElement.value = "";
        passwordElement.value = "";
}

// authenticate user from the db
const loginUser = () => {
    let username = usernameElement.value;
    let password = passwordElement.value;

    sessionStorage['fname'] = username;
    var readVal = sessionStorage['fname'];
    console.log(readVal);

    fetch("http://localhost:3000/userLogin", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: username,
            password: password,
        }),
      })
        .then((response) => response.json())
        .then((success) => {
            if (!success) {
                errorDiv.innerHTML = "Incorrect username/password";
            } else {
                errorDiv.innerHTML = "User authenticated";
                window.location.href = "/data.html";
            }
        })
}



const eventListeners = () => {
    if(loginButton.addEventListener){
        loginButton.addEventListener("click", loginUser, false);
    }
    
    if(registerButton.addEventListener){
        registerButton.addEventListener("click", addUser, false);
    }

}

const init = () => {
    eventListeners();
    validateUsername();
}

// event listener
if (window.addEventListener){ 
    window.addEventListener("load", init, false); 
}