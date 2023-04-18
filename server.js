import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
const app = express();

import { addUser } from './database.js';
import { json } from "express";
import dotenv from "dotenv";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.urlencoded({ extended: true }));

// GET routes
app.get('/', (req, res) => {
    res.render('index');
})

app.get('/login', (req, res) => {
    res.render('login');
})

// POST routes
app.post('/userLogin', async (req, res) => {
    const { username, password} = req.body;

    const userLogin = await addUser(username, password);
    res.send(userLogin);
})

app.listen(3000, () => {
    console.log('app listening');
});