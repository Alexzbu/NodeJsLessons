import Product from '../models/Product.mjs'

class ProductService {
  static async getProductsList(reqQuery) {
    console.log(reqQuery)
    const { sort = '_id', category = '', color = '', size = '', brand = '', priceFrom = 0, priceTo = 1000, page = 0, limit = 20 } = reqQuery;
    try {
      const pipeline = [
        {
          $lookup: {
            from: 'categories',
            localField: 'category',
            foreignField: '_id',
            as: 'category',
          }
        },
        {
          $lookup: {
            from: 'colors',
            localField: 'color',
            foreignField: '_id',
            as: 'color',
          }
        },
        {
          $lookup: {
            from: 'sizes',
            localField: 'size',
            foreignField: '_id',
            as: 'size',
          }
        },
        {
          $lookup: {
            from: 'brands',
            localField: 'brand',
            foreignField: '_id',
            as: 'brand',
          }
        },
        {
          $unwind: '$category',
          $unwind: '$color',
          $unwind: '$size',
          $unwind: '$brand',
        },
        {
          $match: {
            price: {
              $gte: Number(priceFrom),
              $lte: Number(priceTo)
            },
          }
        },
      ];

      if (category) { pipeline.push({ $match: { 'category.name': category } }) }
      if (color) { pipeline.push({ $match: { 'color.name': color } }) }
      if (size) { pipeline.push({ $match: { 'size.name': size } }) }
      if (brand) { pipeline.push({ $match: { 'brand.name': brand } }) }

      pipeline.push({ $project: { name: 1, price: 1, image: 1 } });
      pipeline.push({ $sort: { [sort]: 1 } });
      pipeline.push({ $skip: page * limit }, { $limit: limit });

      return await Product.aggregate(pipeline);
    } catch (error) {
      console.error('Error fetching products list:', error);
      throw new Error('Unable to fetch products list.');
    }
  }

  static async addNewProduct(data) {
    const product = new Product(data)
    return await product.save()
  }

  static async getProductById(id) {
    return await Product.findById(id)
  }

  static async updateProduct(id, data) {
    return await Product.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    })
  }

  static async deleteProduct(id) {
    return await Product.findByIdAndDelete(id)
  }
}

export default ProductService
