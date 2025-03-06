import mongoose, { Schema, Document } from 'mongoose';

interface ITheater extends Document {
  theaterId: number;
  location: {
    address: {
      street1: string;
      city: string;
      state: string;
      zipcode: string;
    };
    geo: {
      type: string;
      coordinates: [number, number];
    };
  };
  isDeleted: boolean;
}

const TheaterSchema: Schema = new Schema({
  theaterId: { type: Number, required: true },
  location: {
    address: {
      street1: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipcode: { type: String, required: true },
    },
    geo: {
      type: { type: String, required: true },
      coordinates: [{ type: Number, required: true }],
    },
  },
  isDeleted: { type: Boolean, default: false },
});

export default mongoose.model<ITheater>('Theater', TheaterSchema);