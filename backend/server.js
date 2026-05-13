const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();
const cors = require("cors");
const userRoute = require('./routers/userRouter');
const budgetRoute = require('./routers/budgetRoutes');

const app = express();
app.use(cors());
app.use(express.json());

//connect to database
connectDB();

//Routes
app.use('/api/user', userRoute);
app.use('/api/budgets', budgetRoute);

app.listen(process.env.PORT, () => {
    console.log(`server running on http://localhost:${process.env.PORT}`)
});