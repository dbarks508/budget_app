// async function getData(){
//     //try to fetch budget data
//     try {
//     const dataDisplay = document.getElementById("data");
//     const response = await fetch("http://localhost:3000/data", {
//         method: "GET",
//         headers: {
//             Accept: "application/json",
//             "Content-Type": "application/json",
//         },
//     }); 

//     if(!response.ok){
//         throw new Error("Response was not ok");
//     }
//     // store json response in variable named data
//         const data = await response.json();
//         let index = 1;
//         let name = data[index].fname;
//         let income = data[index].income;
//         let rent = data[index].rent;
//         let car = data[index].car;
//         let insurance = data[index].insurance;
//         let subscriptions = data[index].subscriptions;
//         let phone = data[index].phone;

//         let text = "<table border='2'>";
//         text += `<tr><th>Name</th> <th>Income</th> <th>Rent</th> <th>car</th> <th>insurance</th> <th>subscriptions</th> <th>phone</th></tr>`;
//         text += `<tr>
//                     <td>${name}</td>
//                     <td>${income}</td>
//                     <td>${rent}</td>
//                     <td>${car}</td>
//                     <td>${insurance}</td>
//                     <td>${subscriptions}</td>
//                     <td>${phone}</td>
//                 </tr>`
    
//         text += "</table>";
//         dataDisplay.innerHTML = text;
//     } //end try

//     // if error
//     catch (error){
//     console.error("error fetching data:", error);
//     }
// } // end of function


async function fetchData() {
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
    // getting username from login or session
    let sessionName = sessionStorage['fname'];
    console.log(sessionName);


    // store json response in variable named data
        const data = await response.json();
        console.log("the data: ", data);
        let index = data.findIndex(item => item.fname === sessionName);
        console.log("the index of the username is: " + index);


        // let index = 11;
        let name = data[index].fname;
        let income = data[index].income;
        let rent = data[index].rent;
        let car = data[index].car;
        let insurance = data[index].insurance;
        let subscriptions = data[index].subscriptions;
        let phone = data[index].phone;

        makeChart(income, rent, car, insurance, subscriptions, phone);
    } //end try

    // if error
    catch (error){
    console.error("error fetching data:", error);
    }
    }


// bar chart function
const makeChart = (income, rent, car, insurance, subscriptions, phone) => {
    const chart1 = document.getElementById('myChart1');
    const chart2 = document.getElementById('myChart2');

    new Chart(chart1, {
      type: 'bar',
      data: {
        labels: ['income', 'Rent', 'Car Payment', 'Car insurance payment', 'Monthly subscriptions', 'Monthly phone bill'],
        datasets: [{
          label: '$$$ per month',
          data: [income, rent, car, insurance, subscriptions, phone],
          borderWidth: 3
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    }); // end chart1

    // maths
    let needs = income * .5;
    let wants = income * .3;
    let savings = income * .2;

    let myNeeds = rent + car + insurance + phone + subscriptions;
    let overage = myNeeds - needs;

    let add = false;
    if (overage < 0) {
        overage = Math.abs(overage);
        add = true;
    }
    console.log(overage);

    let overWants = overage * .6;
    let overSavings = overage * .4;
    let adjustedWants;
    let adjustedSavings;

    if (add == false){
        adjustedWants = wants - overWants;
        adjustedSavings = savings - overSavings;
    } else {
        adjustedWants = wants + overWants;
        adjustedSavings = savings + overSavings;
    }


    new Chart(chart2, {
        type: 'bar',
        data: {
          labels: ['Income', 'Needs', 'Wants', 'Savings' ], 
          datasets: [
            {
                label: 'Ideal $ per month',
                data: [income, needs, wants, savings],
                borderWidth: 3,
                borderColor: '#36A2EB',
                backgroundColor: '#9BD0F5',
            },
            {
                label: 'Your $ per month',
                data: [income, myNeeds, adjustedWants, adjustedSavings], 
                borderWidth: 3,
                borderColor: '#FF6384',
                backgroundColor: '#FFB1C1',
            }
        ]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      }); // end chart2

} // end function

const eventListeners = () => {
    // getData();
    fetchData();
}

const init = () => {
    eventListeners();
    
}

// event listener
if (window.addEventListener){ 
    window.addEventListener("load", init, false); 
}