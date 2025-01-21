import CartService from '../services/CartService.mjs'
import { validationResult } from 'express-validator'

class CartController {
  static async getProducts(req, res) {
    try {
      const { userId } = req.query
      const productsList = await CartService.getCart(userId)
      console.log(productsList)
      res.status(200).json(productsList)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }

  static async addProduct(req, res) {
    const userId = req.body.params.userId
    const productId = req.body.params.productId
    try {
      await CartService.addProduct(userId, productId)
      res.status(200).json({ message: 'successful' })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }

  static async deleteCar(req, res) {
    try {
      await CartService.deleteCar(req.params.id)
      res.status(200).json({ message: 'successful' })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }
}

export default CartController
