const dotenv = require('dotenv').config();
const cors = require('cors');
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
app.use("public", express.static(imagePath));
app.use(cors({
    origin: ['https://vinashu.github.io/codex-game', 'https://vinashu.github.io']
}));

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
if(process.env.NODE_ENV === 'production') {
    // Set build folder as static
    app.use(express.static(path.join(__dirname, '../frontend/build')));
    app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../', 'frontend', 'build', 'index.html')));
} else {
    app.get('/', (req, res) => {
        res.status(200).json({message: "Welcome to the FORGE framework"});
     });    
}

// Middleware
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server successfully running on ${PORT}`.yellow);
});