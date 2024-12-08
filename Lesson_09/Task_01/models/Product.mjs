import mongoose from 'mongoose'

const { Schema } = mongoose

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    minlength: [2, 'Name must be at least 2 characters long'],
    maxlength: [20, 'Name must be at most 20 characters long'],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [1, 'Price must be at least 1'],
    toInt: true,
  },
  quantity: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price can not be minus'],
    toInt: true,
  }
})

const Product = mongoose.model('Product', productSchema)
export default Product
