import path from 'path';
import { fileURLToPath } from 'url';
import express, {json} from 'express';
const app = express();
app.use(express.json());

import { addUser, addExpense } from './database.js';
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

// POST routes
app.post('/userLogin', async (req, res) => {
    const { username, password} = req.body;

    const userLogin = await addUser(username, password);
    res.send(userLogin);
});

app.post('/expense', async (req, res) => {
    const {fname, income, rent, car, insurance, subscriptions, phone} = req.body;
    const expense = await addExpense(fname, income, rent, car, insurance, subscriptions, phone);
    res.send(expense);
});

app.listen(3000, () => {
    console.log('app listening');
});