import Size from "../../models/propsModels/Size.mjs"
import pool from '../../db/connectToDB.mjs'

class SizeService {
	static async getSizesList() {
		const sql = `
			 SELECT id, name FROM sizes`
		try {
			const result = await pool.query(sql)
			return result.rows
		} catch (error) {
			console.error('Error fetching sizes list:', error)
			return []
		}
	}

	static async addNewSize(data) {
		const sql = `
            INSERT INTO sizes (name)
            VALUES ($1);`
		const values = [data.name]
		try {
			await pool.query(sql, values)
		} catch (error) {
			console.error('Error adding new size:', error.message)
			throw error
		}
	}

	static async getLocationById(id) {
		return await Size.findById(id)
	}

	static async updateLocation(id, data) {
		return await Size.findByIdAndUpdate(id, data, {
			new: true,
			runValidators: true,
		})
	}

	static async deleteLocation(id) {
		return await Size.findByIdAndDelete(id)
	}
}

export default SizeService
