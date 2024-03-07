import mongoose from 'mongoose';

const collectionDB = 'medicines';

const productSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    imageURL: {
      type: String,
      required: true,
    },
    storeName: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Product = mongoose.model(collectionDB, productSchema);
