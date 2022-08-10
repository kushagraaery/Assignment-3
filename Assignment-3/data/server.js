const express = require('express');
const bodyParser = require('body-parser');


const app = express();

const dbConfig = require('./config/database.config');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Database Connected Successfully!!");    
}).catch(err => {
    console.log('Could not connect to the database', err);
    process.exit();
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const BookRoute = require('./routes/book')
app.use('/book',BookRoute)

app.get('/', (req, res) => {
    res.json({"message": "Hello Crud Node Express"});
});

app.listen(7000, () => {
    console.log("Server is listening on port 7000");
});




