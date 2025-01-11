import mongoose from 'mongoose'

const { Schema } = mongoose

const productSchema = new Schema({
  name: {
    trim: true,
    type: String,
    required: [true, 'Name is required'],
    minlength: [2, 'Name must be at least 2 characters long'],
    maxlength: [30, 'Name must be at most 30 characters long'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
  },
  description: {
    type: String,
    trim: true,
  },
  brand: {
    type: Schema.Types.ObjectId,
    ref: 'Brand',
  },
  sex: {
    type: Schema.Types.ObjectId,
    ref: 'Sex',
  },
  color: {
    type: Schema.Types.ObjectId,
    ref: 'Brand',
  },
  size: {
    type: Schema.Types.ObjectId,
    ref: 'Size',
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
  },
  image: {
    type: String,

  },

})

const Product = mongoose.model('Product', productSchema)
export default Product
