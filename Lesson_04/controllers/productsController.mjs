import Product from '../models/Product.mjs'

class ProductsController {
  static mainProducts(req, res) {
    const productsList = Product.getProductsList()

    res.render('products/productsList', {
      products: productsList,
    })
  }

  static createProduct(req, res) {
    const productData = req.body
    Product.addNewProduct(productData)
    res.redirect('/products')
  }

  static productDetail(req, res) {
    const id = req.params.id
    const product = Product.getProductById(id)
    res.render('products/productDetail', {
      product,
    })
  }

  static productForm(req, res) {
    const product = req.params.id ? Product.getProductById(req.params.id) : null
    res.render('products/productForm', {
      product,
    })
  }

  static updateProduct(req, res) {
    const productData = req.body
    Product.updateProduct(req.params.id, productData)
    res.redirect('/products')
  }

  static deleteProduct(req, res) {
    const id = req.params.id
    const product = Product.getProductById(id)
    Product.deleteProductById(id)
    res.redirect('/products')
  }
}

export default ProductsController
