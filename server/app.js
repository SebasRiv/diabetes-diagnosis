const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');

const publicPath = path.resolve(__dirname, '../public');

// settings
app.set('port', process.env.PORT || 4000);

//middlewares
app.use(cors());
app.use(express.static(publicPath));
app.use(express.json({type: ['application/json', 'text/plain']}));
//app.use(express.urlencoded({extended: false}));

//routes
app.use('/api/diagnosis', require('./routes/diagnosis'));

module.exports = app;