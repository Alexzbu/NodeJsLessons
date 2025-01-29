import User from '../models/User.mjs'
import pool from '../db/connectToDB.mjs'
import bcrypt from 'bcrypt'

class UserService {
	static async getUserList() {
		try {

			return await User.find({})

		} catch (error) {
			return []
		}
	}

	static async addNewUser(data) {
		const hashedPassword = await bcrypt.hash(data.password, 10)
		console.log(hashedPassword)
		data.password = hashedPassword;
		const sql = `
            INSERT INTO users (username, password)
            VALUES ($1, $2);`
		const values = [data.username, data.password]
		try {
			await pool.query(sql, values)
		} catch (error) {
			console.error('Error adding new user:', error.message)
			throw error
		}
	}

	static async getUserById(id) {
		return await User.findById(id)
	}

	static async getUserByName(username) {
		const sql = `
				SELECT username, password 
				FROM users 
				WHERE username = $1;`
		try {
			const result = await pool.query(sql, [username])
			return result.rows[0] || null
		} catch (error) {
			console.error('Error fetching user by username:', error.message)
			throw error
		}
	}

	async update(id, data) {
		return await User.findOneAndUpdate({ _id: id }, data)
	}

	static async deleteUser(id) {
		return await User.findByIdAndDelete(id)
	}
}

export default UserService
