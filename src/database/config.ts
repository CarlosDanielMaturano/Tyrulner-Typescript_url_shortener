import mongoose from 'mongoose';

mongoose.connect(<string>process.env.DB_URI);

const DB: mongoose.Connection = mongoose.connection;

export default DB;
