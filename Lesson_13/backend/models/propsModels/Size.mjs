import mongoose from 'mongoose'

const { Schema } = mongoose

const sizeSchema = new Schema({
  name: {
    trim: true,
    type: String,
    required: [true, 'Name of size is required'],
    minlength: [2, 'Name of size must be at least 3 characters long'],
    maxlength: [20, 'Name of size must be at most 20 characters long'],
  },
})

const Size = mongoose.model('Size', sizeSchema)
export default Size