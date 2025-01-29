import Sex from "../../models/propsModels/Sex.mjs"
import pool from '../../db/connectToDB.mjs'


class SexService {
	static async getSexesList() {
		const sql = `
			 SELECT id, name FROM sexes`
		try {
			const result = await pool.query(sql)
			return result.rows
		} catch (error) {
			console.error('Error fetching sexes list:', error)
			return []
		}
	}

	static async addNewSex(data) {
		const sql = `
            INSERT INTO sexes (name)
            VALUES ($1);`
		const values = [data.name]
		try {
			await pool.query(sql, values)
		} catch (error) {
			console.error('Error adding new sex:', error.message)
			throw error
		}
	}

	static async getLocationById(id) {
		return await Sex.findById(id)
	}

	static async updateLocation(id, data) {
		return await Sex.findByIdAndUpdate(id, data, {
			new: true,
			runValidators: true,
		})
	}

	static async deleteLocation(id) {
		return await Sex.findByIdAndDelete(id)
	}
}

export default SexService
