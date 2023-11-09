import mongoose from 'mongoose';
import { Schema } from 'mongoose';
import UrlInterface from '../../interfaces/UrlInterface';

const URlSchema: Schema = new Schema<UrlInterface>({
  originalUrl: {
    type: String,
    required: true,
  },
  short: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const URLModel = mongoose.model('urls', URlSchema);

export default URLModel;
