// require('dotenv').config();

// const port = process.env.PORT || 3000;
const express = require('express');
const app = express();
const axios = require('axios');
var bodyParser = require('body-parser');
const base_url = 'https://localhost:3000';


app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

app.get('/', async (req, res) => {
    try {
        const response = await axios.get(base_url + '/api');
        res.render('books', { books: response.data });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('book/:id', async (req, res) => {
    try {
        const response = await axios.get(base_url + '/books/' + req.params.id);
        res.render('book', { book: response.data });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/create', async (req, res) => {
    res.render('create');
});

app.post('/create', async (req, res) => {
    try {
        const data = { title: req.body.title, author: req.body.author };
        await axios.post(base_url + '/books', data);    
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('update/:id', async (req, res) => {
    try {
        const response = await axios.get(
            base_url + '/books/' + req.params.id);
            res.render('update', { book: response.data });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/update/:id', async (req, res) => {
    try {
        const data = { title: req.body.title, author: req.body.author };
        await axios.put(base_url + '/books/' + req.params.id, data);
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/delete/:id', async (req, res) => {
    try {
        await axios.delete(base_url + '/books/' + req.params.id);
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


app.listen(5500, () => {    
    console.log(`Server is running on http://localhost:5500`);
});