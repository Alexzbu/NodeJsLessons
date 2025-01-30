import Category from "../../models/propsModels/Category.mjs"
import pool from '../../db/connectToDB.mjs'

class CategoryService {
	static async getCategorysList() {
		const sql = `
			 SELECT id, name FROM categories`
		try {
			const result = await pool.query(sql)
			return result.rows
		} catch (error) {
			console.error('Error fetching categories list:', error)
			return []
		}
	}

	static async addNewCategory(data) {
		const sql = `
            INSERT INTO categories (name)
            VALUES ($1);`
		const values = [data.name]
		try {
			await pool.query(sql, values)
		} catch (error) {
			console.error('Error adding new category:', error.message)
			throw error
		}
	}

	static async getLocationById(id) {
		return await Category.findById(id)
	}

	static async updateLocation(id, data) {
		return await Category.findByIdAndUpdate(id, data, {
			new: true,
			runValidators: true,
		})
	}

	static async deleteLocation(id) {
		return await Category.findByIdAndDelete(id)
	}
}

export default CategoryService
