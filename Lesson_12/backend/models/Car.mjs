import mongoose from 'mongoose'

const { Schema } = mongoose

const carSchema = new Schema({
  brand: {
    type: String,
    required: [true, 'Brand is required'],
    minlength: [2, 'Brand must be at least 2 characters long'],
    maxlength: [20, 'Brand must be at most 20 characters long'],
    trim: true,
  },
  year: {
    type: Number,
    required: [true, 'Year is required'],
    min: [1900, 'Year must be at least 1900'],
    max: [new Date().getFullYear(), 'Year must not be more that now '],
    toInt: true,
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
  },
  description: {
    type: String,
    trim: true,
  },
  image: {
    type: String,
    required: [true, 'Image is required'],

  },
  location: {
    type: Schema.Types.ObjectId,
    ref: 'Location',
  },
})

const Car = mongoose.model('Car', carSchema)
export default Car
