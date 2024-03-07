import express, { json } from 'express';
import { Order } from '../models/orderModel.js';

const router = express.Router();

// Route for Save a new Order
router.post('/', async (request, response) => {
  try {
    if (
      !request.body.name ||
      !request.body.email ||
      !request.body.phone ||
      !request.body.address ||
      !request.body.medicines
    ) {
      return response.status(400).send({
        message: 'Send all required fields: title, author, publishYear',
      });
    }
    const newOrder = {
      name: request.body.name,
      email: request.body.email,
      phone: request.body.phone,
      address: request.body.address,
      medicines: request.body.medicines,
    };

    const order = await Order.create(newOrder);
    return response.status(201).send(order);

  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

router.get('/', async (request, response) => {
  try {
    const orders = await Order.find({});
    //const obj = JSON.parse(orders[0]['medicines']);
    // console.log((orders[0]['medicines']));
    // console.log(obj[0]['name']);
    return response.status(200).json({
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
