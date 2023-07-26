import dotenv from "dotenv";
dotenv.config();
import connectionQuery from "./ssh.js";

export async function addUser(username, password) {
    const result = connectionQuery(
        `INSERT INTO login VALUES (${username}, ${password});`
    );
    return result;
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