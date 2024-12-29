import mongoose from 'mongoose'

const { Schema } = mongoose

const locationSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Name of location is required'],
    minlength: [3, 'Name of location must be at least 3 characters long'],
    maxlength: [20, 'Name of location must be at most 50 characters long'],
    trim: true,
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
    minlength: [3, 'Address must be at least 3 characters long'],
    maxlength: [50, 'Address must be at most 50 characters long'],
    trim: true,
  },
})

const Location = mongoose.model('Location', locationSchema)
export default Location