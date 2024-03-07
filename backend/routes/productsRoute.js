import express from 'express';
import { Product } from '../models/productModel.js';

const router = express.Router();

router.get('/:storeName', async (request, response) => {
  try {
    const storeName = request.params.storeName;
    const products = await Product.find({ storeName });

    return response.status(200).json(products);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
