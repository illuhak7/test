import mongoose from 'mongoose';

const collectionDB = 'orders';


const orderSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    medicines: {
      type: String, // [[citramon, 2], [noshpa, 1]]
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

export const Order = mongoose.model(collectionDB, orderSchema);
