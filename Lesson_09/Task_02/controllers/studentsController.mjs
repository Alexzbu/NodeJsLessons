import StudentsService from '../services/studentsService.mjs'
import CourseService from '../services/courseService.mjs'
import { validationResult } from 'express-validator'

class StudentsController {
	static async getStudents(req, res) {
		try {
			const students = await StudentsService.getStudenstList()

			res.render('students/studentsList', {
				students,
			})
		} catch (err) {
			res.status(500).json({ error: err.message })
		}
	}

	static async createStudent(req, res) {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			const student = req.body
			student.id = req.params.id
			const courses = await CourseService.getCoursesList()
			const errorMessages = {}
			errors.array().forEach(error => {
				if (!errorMessages[error.path]) {
					errorMessages[error.path] = []
				}
				errorMessages[error.path].push(error.msg)
			})
			return res.status(400).render('students/studentForm', {
				student,
				courses,
				errors: errorMessages,
			})
		}

		const studentData = req.body
		const newStudent = await StudentsService.addNewStudent(studentData)

		CourseService.updateCourse(studentData.courseId, {
			$push: { students: newStudent.id }
		})
		res.redirect('/students')
	}

	static async studentForm(req, res) {
		const student = req.params.id ? await StudentsService.getStudentById(req.params.id) : null
		const courses = await CourseService.getCoursesList()
		res.render('students/studentForm', {
			student,
			courses,
			errors: []
		})
	}

	static async updateStudent(req, res) {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			const student = req.body
			student.id = req.params.id
			const errorMessages = {}
			errors.array().forEach(error => {
				if (!errorMessages[error.path]) {
					errorMessages[error.path] = []
				}
				errorMessages[error.path].push(error.msg)
			})
			return res.status(400).render('students/studentForm', {
				student,
				errors: errorMessages,
			})
		}
		try {
			const studentNewData = req.body
			await StudentsService.updateStudent(req.params.id, studentNewData)
			res.redirect('/students')
		} catch (err) {
			res.status(500).json({ error: err.message })
		}
	}

	static async deleteStudent(req, res) {
		try {
			await StudentsService.deleteStudent(req.params.id)
			res.redirect('/students')
		} catch (err) {
			res.status(500).json({ error: err.message })
		}
	}
}

export default StudentsController
