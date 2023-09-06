import path from 'path';
import bcrypt from "bcrypt";
import session from "express-session";
import { fileURLToPath } from 'url';
import express, {json, response} from 'express';
const app = express();
app.use(express.json());
app.use(
    session({
      secret: "secret",
      resave: true,
      saveUninitialized: true,
    })
  );

import { addUser, addExpense, getExpenses, checkUsernamePassword } from './database.js';
import dotenv from "dotenv";
import { request } from 'http';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

// GET routes
app.get('/', (req, res) => {
    // res.render('index');
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get('/login', (req, res) => {
    // res.render('login');
    res.sendFile(path.join(__dirname, "public/login.html"));
});

app.get('/data', async (req, res) => {
    // let username = req.session.username;
    // console.log(req.session.username);

    const response = await getExpenses();
    res.send(response);
});

// POST routes
app.post('/expense', async (req, res) => {
    const {fname, income, rent, car, insurance, subscriptions, phone} = req.body;
    const expense = await addExpense(fname, income, rent, car, insurance, subscriptions, phone);
    res.send(expense);
});

// add user to db
app.post('/addUser', async (req, res) => {
    const username = req.body.username;
    const salt = bcrypt.genSaltSync(10);
    const password = await bcrypt.hash(req.body.password, salt);

    const result = await addUser(username, password, salt);
    if(result == false){
        console.log('user already exists');
        res.json(false);
    } else {
        req.session.loggedin = true;
        req.session.username = username;
        res.json(true);
    }
});

// check username and login from db
app.post('/userLogin', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (username && password){
        (async function () {
            try {
                const results = await checkUsernamePassword(username);
                const saltedPassword = await bcrypt.hash(password, results[0].salt);
                await passwordCheck(password, saltedPassword, req, res);
            } catch (error) {
                console.log(error);
            }
        })();
    } else {
        res.json(false);
    } // end if-else

    async function passwordCheck(inputPassword, databasePassword, req, res){
        console.log(inputPassword, databasePassword);
        let result = await bcrypt.compare(inputPassword, databasePassword);
        console.log(result);
        if (result) {
            // authenticate user
            req.session.loggedIn = true;
            req.session.username = username;
            console.log(req.session.username);
            res.json(true);
        } else {
            res.json(false);
        }
    }
})



app.listen(3000, () => {
    console.log('app listening');
});