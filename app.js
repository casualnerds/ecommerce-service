if (!process.env.NODE_ENV || process.env.NODE_ENV == 'development' || process.env.NODE_ENV == 'test') {
    require('dotenv').config();
};

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes');
const { errorHandler } = require('./middlewares');

mongoose.connect('mongodb://localhost:27017/ecommerce-kita', {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => {
    console.log('CONNECTED TO MONGOOSE DATABASE')
}).catch(err => console.log(err));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.get('/', (req, res, next) => {
    res.send('Hello from node js')
});

app.use('/', routes);

app.use(errorHandler)

module.exports = app;