import Product from '../models/Product.mjs'
import pool from '../db/connectToDB.mjs';

class ProductService {
  static async getProductsList(reqQuery) {
    const { name = '', sort = '_id', category = '', color = '', size = '', brand = '', priceFrom = 0, priceTo = 1000, page = 0, limit = 20 } = reqQuery;
    try {


      return []
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
    const sql = 'INSERT INTO products SET ?'
    const [result] = await pool.query(sql, data)
    return result
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
