import dotenv from "dotenv";
dotenv.config();
import connectionQuery from "./ssh.js";

export async function addUser(username, password, salt) {
    let result = await connectionQuery(
        `SELECT * from login WHERE username = '${username}';`
    );
        
    if (result.length > 0) {
        return false;
    } else {
        result = await connectionQuery(
            `INSERT INTO login (username, password, salt) VALUES ('${username}', '${password}', '${salt}');`
        );
        return result;
    }
}

export async function addExpense(fname, income, rent, car, insurance, subscriptions, phone) {
    const result = await connectionQuery(
        `INSERT INTO user_expense (fname, income, rent, car, insurance, subscriptions, phone) VALUES ("${fname}", ${income}, ${rent}, ${car}, ${insurance}, ${subscriptions}, ${phone});`
    );
    return result;
}

export async function getExpenses() {
    const result = await connectionQuery(
        `SELECT * FROM user_expense;`
    );
    return result;
}