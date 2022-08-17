const dotenv = require('dotenv').config();
const path = require('path');
const imagePath = path.join(__dirname, 'images/');
const express = require('express')
const {errorHandler} = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const colors = require('colors');
const PORT = process.env.PORT || 6001;

// Connect to database
connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("images", express.static(imagePath));

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/api/variables', require('./routes/variableRoutes'));
app.use('/api/operations', require('./routes/operationRoutes'));
app.use('/api/rewards', require('./routes/rewardRoutes'));
app.use('/api/targets', require('./routes/targetRoutes'));
app.use('/api/engine', require('./routes/engineRoutes'));
app.use('/images', require('./routes/imageRoutes'));

// Serve Frontend
console.log(process.env.NODE_ENV);
if(process.env.NODE_ENV === 'production') {
    // Set build folder as static
    app.use(express.static(path.join(__dirname, '../frontend/build')));
    console.log('Production mode');
    app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../', 'frontend', 'build', 'index.html')));
} else {
    app.get('/', (req, res) => {
        res.status(200).json({message: "Welcome to the FORGE framework"});
     });    
}

// Middleware
app.use(errorHandler);

/*
//Handler for 404 - Resource not Found
app.use(function(req, res, next){
    console.log("404/" + req.method + "=>" + req.originalUrl);
    res.status(404).send("We think you are lost :-/");
});
//Error handling middleware
app.use(function(err, req, res, next){
    console.log(err); // to see properties of message in our console
    res.status(422).send({error: err.message});
});

app.use(function(req, res, next) {
    res.status(404);
  
    // respond with html page
    if (req.accepts('html')) {
      res.render('404', { url: req.url });
      return;
    }
  
    // respond with json
    if (req.accepts('json')) {
      res.json({ error: 'Not found' });
      return;
    }
  
    // default to plain-text. send()
    res.type('txt').send('Not found');
});

process.on('uncaughtException', (error)  => {
    //console.log('Alert! ERROR : ',  error);
    // process.exit(1); // Exit your app 
    throw new Error('uncaughtException');
});

process.on('unhandledRejection', (error, promise)  => {
    //console.log('Alert! ERROR : ',  error);
    // process.exit(1); // Exit your app 
    throw new Error('unhandledRejection');
});
*/
app.listen(PORT, () => {
    console.log(`Server successfully running on ${PORT}`.yellow);
});

// server.on('clientError', (err, socket) => {
//     console.error(err);
//     socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
// });