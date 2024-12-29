import User from '../models/User.mjs'

class UserService {
	static async getUserList() {
		try {

			return await User.find({})

		} catch (error) {
			return []
		}
	}

	static async addNewUser(data) {
		const user = new User(data)
		return await user.save()
	}

	static async getUserById(id) {
		return await User.findById(id)
	}

	static async getUserByName(username) {
		return await User.findOne(username)
	}

	static async updateUser(id, data) {
		return await User.findByIdAndUpdate(id, data, {
			new: true,
			runValidators: true,
		})
	}

	static async deleteUser(id) {
		return await User.findByIdAndDelete(id)
	}
}

export default UserService
