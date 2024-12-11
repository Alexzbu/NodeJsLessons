import Student from '../models/Student.mjs'

class StudentsService {
	static async getStudenstList() {
		try {

			return await Student.find({})

		} catch (error) {
			return []
		}
	}

	static async addNewStudent(data) {
		const studnet = new Student(data)
		return await studnet.save()
	}

	static async updateStudent(id, data) {
		return await Student.findByIdAndUpdate(id, data, {
			new: true,
			runValidators: true,
		})
	}

	static async getStudentById(id) {
		return await Student.findById(id)
	}

	static async deleteStudent(id) {
		return await Student.findByIdAndDelete(id)
	}
}

export default StudentsService
