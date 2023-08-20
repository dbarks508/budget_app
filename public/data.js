async function getData(){
    //try to fetch budget data
    try {
    const dataDisplay = document.getElementById("data");
    const response = await fetch("http://localhost:3000/data", {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    }); 

    if(!response.ok){
        throw new Error("Response was not ok");
    }
    // store json response in variable named data
        const data = await response.json();
        let index = 1;
        let name = data[index].fname;
        let income = data[index].income;
        let rent = data[index].rent;
        let car = data[index].car;
        let insurance = data[index].insurance;
        let subscriptions = data[index].subscriptions;
        let phone = data[index].phone;

        let text = "<table border='2'>";
        text += `<tr><th>Name</th> <th>Income</th> <th>Rent</th> <th>car</th> <th>insurance</th> <th>subscriptions</th> <th>phone</th></tr>`;
        text += `<tr>
                    <td>${name}</td>
                    <td>${income}</td>
                    <td>${rent}</td>
                    <td>${car}</td>
                    <td>${insurance}</td>
                    <td>${subscriptions}</td>
                    <td>${phone}</td>
                </tr>`
    
        text += "</table>";
        dataDisplay.innerHTML = text;
    } //end try

    // if error
    catch (error){
    console.error("error fetching data:", error);
    }




} // end of function

const eventListeners = () => {
    getData();
}

const init = () => {
    eventListeners();
    
}

// event listener
if (window.addEventListener){ 
    window.addEventListener("load", init, false); 
}