const loginButton = document.getElementById("loginButton");
const registerButton = document.getElementById("registerButton");

const usernameElement = document.getElementById("loginItem1");
const passwordElement = document.getElementById("loginItem2");
const errorDiv = document.getElementById("errorDiv");


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
            } else {
                errorDiv.innerHTML = "User successfully added";
            }
        })
        .catch((error) => {
            console.error("Fetch error: ", error);
        });

        usernameElement.value = "";
        passwordElement.value = "";
}

const loginUser = () => {
    let username = usernameElement.value;
    let password = passwordElement.value;

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
}

// event listener
if (window.addEventListener){ 
    window.addEventListener("load", init, false); 
}