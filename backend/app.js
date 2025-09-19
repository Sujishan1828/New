const express = require('express');
const dotenv = require('dotenv');
const productRoute = require('./routes/product');
const authRoute = require('./routes/auth');
const orderRoute = require('./routes/order');
const reviewRoute = require('./routes/review');
const paymentRoute = require('./routes/payment');
const offerRoutes = require('./routes/offerProduct');
const errorMiddleware =  require('./middleware/error');
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const path = require('path')
const cors = require('cors')
const app = express();

dotenv.config();
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use('/api/v1',productRoute);
app.use('/api/v1',authRoute);
app.use('/api/v1',orderRoute);
app.use('/api/v1',reviewRoute);
app.use('/api/v1',paymentRoute);
app.use('/api/v1', offerRoutes);



app.use(errorMiddleware);
module.exports =app;