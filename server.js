const path = require('path');
const express = require('express');
const app = express();


app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));

// routes
app.get('/', (req, res) => {
    res.render('index');
})

app.listen(3000);