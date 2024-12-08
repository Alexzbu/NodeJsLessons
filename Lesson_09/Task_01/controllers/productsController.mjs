import ProductsService from "../services/ProductsService.mjs"

class ProductsController {
	static async getProducts(req, res) {
		try {
			const { sort } = req.query
			const sortOption = sort ? sort : ''
			const products = await ProductsService.getProductsList(sortOption)

			res.render('products', {
				products,
				username: req.session.username
			})
		} catch (err) {
			res.status(500).json({ error: err.message })
		}
	}

	static addProduct(req, res) {
		const ProductData = req.body
		ProductsService.addNewProduct(ProductData)
		res.redirect('/products?sort=desc')
	}

	static ProductForm(req, res) {
		res.render('addProduct')
	}

	static async deleteProduct(req, res) {
		try {
			await ProductsService.deleteProduct(req.params.id)
			res.redirect('/products')
		} catch (err) {
			res.status(500).json({ error: err.message })
		}
	}
}

export default ProductsController
