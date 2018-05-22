import mongoose from 'mongoose';

const ExampleSchema = new mongoose.Schema({
  firstName: {
    type: String,
    index: true,
  },
  lastName: {
    type: String,
    index: true,
  },
});

export default mongoose.model('example', ExampleSchema);
