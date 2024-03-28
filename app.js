const express = require('express')
const logger = require('./middlewares/logger');
const { notFound, errorHandler } = require('./middlewares/errors');
const connectToDB = require('./config/connectToDB');
require('dotenv').config()


// connect to db
connectToDB();

// init express
const app = express();
app.use(express.json());
//logger middleware
app.use(logger);

// routes
app.use('/api/books',require('./routes/books'));
app.use('/api/authors',require('./routes/authors'));
app.use('/api/auth',require('./routes/auth'));
app.use('/api/users',require('./routes/users'));



// // not found route
app.use(notFound);

// // error handling
app.use(errorHandler);
// run server
const PORT = process.env.PORT|| 3000;
app.listen(PORT,()=>{
    console.log(`server is running in ${process.env.NODE_ENV} mode  on port ${PORT}`);
})
