require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const authRouter = require('./routes/authRouter');
const userRouter = require('./routes/userRouter');

const app = express();

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
