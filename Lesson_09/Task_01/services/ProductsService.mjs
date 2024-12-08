import Product from '../models/Product.mjs'

class ProductsService {
	static async getProductsList(sortOption) {
		try {
			let sortDirection = {}

			if (sortOption) {
				const direction = sortOption === 'asc' ? 1 : -1
				sortDirection = { price: direction }
			}

			return await Product.find({}).sort(sortDirection)

		} catch (error) {
			return []
		}
	}

	static addNewProduct(data) {
		const product = new Product(data)
		return product.save()
	}

	static async deleteProduct(id) {
		return await Product.findByIdAndDelete(id)
	}
}

export default ProductsService
