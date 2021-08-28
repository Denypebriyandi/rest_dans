require ('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const login = require('./routes/r_login');
const getData = require('./routes/r_getData');

const app = express();
app.use(bodyParser.json({limit: '250mb', extended: true}));
app.use(bodyParser.urlencoded( {limit: "250mb", extended: false, parameterLimit:50000 } ));
app.use('/rest_dans/v1', login);
app.use('/rest_dans/v1', getData);

const port = process.env.PORT;
app.listen(port, () => console.log('run server on '+port));