import Cart from "../models/Cart.mjs"

class CartService {
  static async getCart(userId) {
    try {
      return await Cart.findOne({ customer: userId })
        .populate({
          path: 'productList.product',
          populate: [
            { path: 'color' },
            { path: 'size' }
          ]
        })

    } catch (error) {
      throw new Error('Cart not found')
    }
  }

  static async addProduct(userId, productId) {
    try {
      let cart = await Cart.findOne({ customer: userId })
      if (cart) {
        const productIndex = cart.productList.findIndex(
          (item) => item.product.toString() === productId
        )

        if (productIndex > 1) {
          cart.productList[productIndex].amount += 1
        } else {
          cart.productList.push({ product: productId, amount: 1 })
        }
        return await cart.save()
      } else {
        console.log(userId)
        return await Cart.create({
          customer: userId,
          productList: [{ product: productId, amount: 1 }]
        })
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}


export default CartService
