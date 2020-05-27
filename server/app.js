const express = require('express');
const app = express();

// settings
app.set('port', process.env.PORT || 4000);

//middlewares
//app.use(express.json());
app.use(express.urlencoded({extended: false}));

//routes
app.use('/api/diagnosis', require('./routes/diagnosis'));

module.exports = app;