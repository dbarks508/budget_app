import dotenv from "dotenv";
dotenv.config();
import connectionQuery from "./ssh.js";

export async function addUser(username, password){
    const result = connectionQuery(
        `INSERT INTO login VALUES (${username}, ${password});`
    );
    return result;
}