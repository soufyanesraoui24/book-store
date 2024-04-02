const express = require('express')
const logger = require('./middlewares/logger');
const { notFound, errorHandler } = require('./middlewares/errors');
const connectToDB = require('./config/connectToDB');
const ejs = require('ejs');
const path = require('path');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config()

// connect to db
connectToDB();

// init express
const app = express();

app.use(express.static(path.join(__dirname,'images')));


app.use(express.json());
app.use(express.urlencoded({extended:false}));
//logger middleware
app.use(logger);
// helmet 
app.use(helmet());
//cors policy
app.use(cors({
    origin: process.env.CORS_ORIGIN
}));
// view engine
app.set('view engine','ejs');

// routes
app.use('/api/books',require('./routes/books'));
app.use('/api/authors',require('./routes/authors'));
app.use('/api/auth',require('./routes/auth'));
app.use('/api/users',require('./routes/users'));
app.use('/api/upload',require('./routes/upload'));
app.use('/password',require('./routes/password'));



// // not found route
app.use(notFound);

// // error handling
app.use(errorHandler);
// run server
const PORT = process.env.PORT|| 3000;
app.listen(PORT,()=>{
    console.log(`server is running in ${process.env.NODE_ENV} mode  on port ${PORT}`);
})
