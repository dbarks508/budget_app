const usernameElement = document.getElementById("LoginItem1");
const passwordElement = document.getElementById("LoginItem2");


const sendLogin = () => {
    fetch("http://localhost:3000/UserLogin", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: ,
            password: 
        }),
      })
        .then((response) => response.json())
        .then((response) => console.log(JSON.stringify(response)));
}



const eventListeners = () => {
    let loginButton = document.getElementById("loginButton");
    if(loginButton.addEventListener){
        loginButton.addEventListener("click", sendLogin, false);
    }
}

const init = () => {
    eventListeners();
    
}

// event listener
if (window.addEventListener){ 
    window.addEventListener("load", init, false); 
}