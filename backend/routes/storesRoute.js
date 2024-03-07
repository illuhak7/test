import express from 'express';
import { Product } from '../models/productModel.js';

const router = express.Router();

router.get('/', async (request, response) => {
  try {
    const uniqueStoreNames = await Product.distinct('storeName');

    return response.status(200).json(uniqueStoreNames);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
