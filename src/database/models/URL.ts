import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const URlSchema: Schema = new Schema({
  id: { type: String },
  originalUrl: { type: String },
  shortUrl: { type: String },
  date: { type: Date },
});

const URLModel = mongoose.model('urls', URlSchema);

export default URLModel;
