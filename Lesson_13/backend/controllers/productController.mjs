import ProductService from '../services/ProductService.mjs'
import { validationResult } from 'express-validator'

class ProductController {
  static async getProducts(req, res) {
    try {
      const productsList = await ProductService.getProductsList(req.query)
      res.status(200).json(productsList)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }

  static async createProduct(req, res) {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      const errorMessages = {}
      errors.array().forEach(error => {
        errorMessages[error.path] = error.msg
      })
      return res.status(400).json(errorMessages)
    }

    const productData = req.body
    if (req.file?.buffer) {
      productData.image = "data:image/jpeg;base64," + req.file.buffer.toString('base64')
    }
    if (req.params.id) {
      await ProductService.updateCar(req.params.id, carData)
    } else {
      await ProductService.addNewProduct(productData)
    }
    res.status(200).json({ message: 'successful' })
  }

  static async procuctDetail(req, res) {
    try {
      const id = req.params.id
      const product = await ProductService.getProductById(id)
      res.status(200).json({ product })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }

  static async deleteCar(req, res) {
    try {
      await ProductService.deleteCar(req.params.id)
      res.status(200).json({ message: 'successful' })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }
}

export default ProductController
