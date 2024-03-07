import express from 'express';
import { PORT, mongoDB_URL } from './config.js';
import mongoose from 'mongoose';
import ordersRoute from './routes/ordersRoute.js';
import productsRoute from './routes/productsRoute.js'
import storesRoute from './routes/storesRoute.js'
import cors from 'cors';

const app = express();

app.use(express.json());

app.use(cors());

app.get('/', (request, response) => {
  console.log(request);
  return response.status(234).send('Welcome To MERN Stack Tutorial');
});

app.use('/orders', ordersRoute);
app.use('/products', productsRoute);
app.use('/stores', storesRoute);


mongoose
  .connect(mongoDB_URL)
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
