import path from 'path';
import bcrypt from "bcrypt";
import session from "express-session";
import { fileURLToPath } from 'url';
import express, {json} from 'express';
const app = express();
app.use(express.json());
app.use(
    session({
      secret: "secret",
      resave: true,
      saveUninitialized: true,
    })
  );

import { addUser, addExpense, getExpenses } from './database.js';
import dotenv from "dotenv";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));

// GET routes
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/data', async (req, res) => {
    const response = await getExpenses();
    res.send(response);
});

// POST routes
app.post('/addUser', async (req, res) => {
    const username = req.body.username;
    const salt = bcrypt.genSaltSync(10);
    const password = await bcrypt.hash(req.body.password, salt);

    const result = await addUser(username, password, salt);
    if(result === false){
        res.send("User already exists");
    } else {
        req.session.loggedin = true;
        req.session.username = username;
    }
});

app.post('/expense', async (req, res) => {
    const {fname, income, rent, car, insurance, subscriptions, phone} = req.body;
    const expense = await addExpense(fname, income, rent, car, insurance, subscriptions, phone);
    res.send(expense);
});

app.listen(3000, () => {
    console.log('app listening');
});