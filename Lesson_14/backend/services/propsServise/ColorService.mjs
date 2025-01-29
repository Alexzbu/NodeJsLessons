import Color from "../../models/propsModels/Color.mjs"
import pool from '../../db/connectToDB.mjs'


class ColorService {
	static async getColorsList() {
		const sql = `
			 SELECT id, name FROM colors`
		try {
			const result = await pool.query(sql)
			return result.rows
		} catch (error) {
			console.error('Error fetching color list:', error)
			return []
		}
	}

	static async addNewColor(data) {
		const sql = `
            INSERT INTO colors (name)
            VALUES ($1);`
		const values = [data.name]
		try {
			await pool.query(sql, values)
		} catch (error) {
			console.error('Error adding new color:', error.message)
			throw error
		}
	}

	static async getLocationById(id) {
		return await Color.findById(id)
	}

	static async updateLocation(id, data) {
		return await Color.findByIdAndUpdate(id, data, {
			new: true,
			runValidators: true,
		})
	}

	static async deleteLocation(id) {
		return await Color.findByIdAndDelete(id)
	}
}

export default ColorService
