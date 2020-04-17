const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');
const colors = require('colors');

// Load env vars
dotenv.config({path:'./config/config.env'});

// Connect to DB
connectDB();

// Route files
const bootcamps = require('./Routes/bootcamps')

const app = express();

if (process.env.NODE_ENV == "development"){
    app.use(morgan('dev'));
}

// Mount routers 
app.use('/api/v1/bootcamps', bootcamps);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT} in ${process.env.NODE_ENV} mode`.yellow.bold));

process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err}`.red);
    server.close(()=>{
        process.exit(1);
    });
});