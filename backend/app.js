const express = require('express');
const bodyParser = require('body-parser');
const HttpError = require('./models/http-error');

const searchRoutes = require('./routes/search-route');

const app = express();


app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');

    next();
});

app.use(searchRoutes);



app.listen(5000);