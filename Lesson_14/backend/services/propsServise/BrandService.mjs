import Brand from "../../models/propsModels/Brand.mjs"
import pool from '../../db/connectToDB.mjs'

class BrandService {
	static async getBrandsList() {
		const sql = `
			 SELECT id, name FROM brands`
		try {
			const result = await pool.query(sql)
			return result.rows
		} catch (error) {
			console.error('Error fetching brands list:', error)
			return []
		}
	}

	static async addNewBrand(data) {
		const sql = `
            INSERT INTO brands (name)
            VALUES ($1);`
		const values = [data.name]
		try {
			await pool.query(sql, values)
		} catch (error) {
			console.error('Error adding new brand:', error.message)
			throw error
		}
	}

	static async getLocationById(id) {
		return await Brand.findById(id)
	}

	static async updateLocation(id, data) {
		return await Brand.findByIdAndUpdate(id, data, {
			new: true,
			runValidators: true,
		})
	}

	static async deleteLocation(id) {
		return await Brand.findByIdAndDelete(id)
	}
}

export default BrandService
