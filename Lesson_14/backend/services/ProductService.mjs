import Product from '../models/Product.mjs'
import pool from '../db/connectToDB.mjs';

class ProductService {
  static async getProductsList(reqQuery) {
    const sql = `
			 SELECT id, name, price, image FROM products`
    try {
      const result = await pool.query(sql)
      return result.rows
    } catch (error) {
      console.error('Error fetching products list:', error);
      return []
    }
  }

  static async getProductPropsList(reqQuery) {
    const { name = '' } = reqQuery;
    let colors = [];
    let sizes = [];

    const sql = `
        SELECT col.name AS color_name, s.name AS size_name
        FROM products p
        LEFT JOIN colors col ON p.color_id = col.id
        LEFT JOIN sizes s ON p.size_id = s.id
        WHERE p.name = $1
    `;

    try {
      const result = await pool.query(sql, [name]);
      colors = [...new Set(result.rows.map((item) => item.color_name))];
      sizes = [...new Set(result.rows.map((item) => item.size_name))];

      return { colors, sizes };
    } catch (error) {
      console.error('Error fetching props list:', error);
      return { colors: [], sizes: [] };
    }
  }

  static async addNewProduct(data) {
    const sql = `INSERT INTO products (name, price, description, image, brand_id, sex_id, color_id, size_id, category_id) 
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);`
    const values = [data.name, data.price, data.description, data.image, data.brand, data.sex, data.color, data.size, data.category];
    try {
      await pool.query(sql, values)
    } catch (error) {
      console.error('Error adding new product:', error.message)
      throw error
    }
  }

  static async getProductById(id) {
    const sql = `
        SELECT p.id, p.name, p.price, p.description, p.image, 
               c.name AS category_name, 
               col.name AS color_name, 
               s.name AS size_name
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id
        LEFT JOIN colors col ON p.color_id = col.id
        LEFT JOIN sizes s ON p.size_id = s.id
        WHERE p.id = $1
    `
    try {
      const result = await pool.query(sql, [id]);
      return result.rows[0];
    } catch (error) {
      console.error('Error fetching product:', error);
    }
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
