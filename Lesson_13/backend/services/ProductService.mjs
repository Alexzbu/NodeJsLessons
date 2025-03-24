import Product from '../models/Product.mjs'

class ProductService {
  static async getProductsList(reqQuery) {
    const { name = '', color = '', sort = '_id', filter = {}, search = '', page = 0, limit = 20 } = reqQuery;
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
              $gte: Number(filter.priceFrom || 0),
              $lte: Number(filter.priceTo || 1000)
            },
          }
        },
      ];

      if (name && color) {
        pipeline.push({ $match: { 'name': name, 'color.name': color } })
      }
      if (search) {
        pipeline.push({
          $match: {
            $or: [
              { 'name': { $regex: new RegExp(search, 'i') } },
              { 'category.name': { $regex: new RegExp(search, 'i') } },
              { 'color.name': { $regex: new RegExp(search, 'i') } },
              { 'size.name': { $regex: new RegExp(search, 'i') } },
              { 'brand.name': { $regex: new RegExp(search, 'i') } }
            ]
          }
        });
      }
      if (filter.category) { pipeline.push({ $match: { 'category.name': { $in: filter.category } } }) }
      if (filter.color) { pipeline.push({ $match: { 'color.name': { $in: filter.color } } }) }
      if (filter.size) { pipeline.push({ $match: { 'size.name': { $in: filter.size } } }) }
      if (filter.brand) { pipeline.push({ $match: { 'brand.name': { $in: filter.brand } } }) }

      pipeline.push({ $project: { name: 1, price: 1, image: 1 } });
      pipeline.push({ $sort: { [sort]: 1 } });
      pipeline.push({ $skip: page * limit }, { $limit: limit });

      return await Product.aggregate(pipeline);
    } catch (error) {
      console.error('Error fetching products list:', error);
      throw new Error('Unable to fetch products list.');
    }
  }

  static async getProductPropsList(reqQuery) {
    const { name = '' } = reqQuery;
    try {
      const pipeline = [
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
          $unwind: "$color"
        },
        {
          $unwind: "$size"
        },
        {
          $match: { name: { $eq: name } }
        },
        {
          $group: {
            _id: "$name",
            colors: { $addToSet: "$color.name" },
            sizes: { $addToSet: "$size.name" }
          }
        }
      ];

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
    return await Product.findById(id).populate('color')
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
