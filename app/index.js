require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');


const db = require('./data_access/index');
const rootRouter = require('../app/api/routes/rootRouter.js');
const errorHandlerMiddleware = require('./api/middlewares/errorHandlerMiddleware')


//initialize express app

const app = express();



app.use(helmet());
app.use(cors());
app.use(bodyParser.json());


// Connect to the database when the server starts
const server = app.listen(3000, async () => {
  try {
    await db.connect();
    console.log('Server is running');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1); // gracefully shut down the server
  }
});


// Close the database connection when the server stops
server.on('close', async () => {
  try {
    await db.disconnect();
    console.log('Server has stopped');
  } catch (error) {
    console.error('Unable to disconnect from the database:', error);
    process.exit(1); // gracefully shut down the server
  }
});

// Routes and middleware here
app.use('/api',rootRouter);

app.use((req, res, next) => {
  res.status(404).json({ message: 'Resource not found' });
});

// Error handling middleware
app.use(errorHandlerMiddleware);
