import UserService from '../services/userService.mjs'
import { validationResult } from 'express-validator'

class UserController {

	static async createUser(req, res) {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			const user = req.body
			const errorMessages = {}
			errors.array().forEach(error => {
				if (!errorMessages[error.path]) {
					errorMessages[error.path] = []
				}
				errorMessages[error.path].push(error.msg)
			})
			return res.status(400).render('auth/register', {
				user,
				errors: errorMessages,
			})
		}

		try {
			const userData = req.body
			await UserService.addNewUser(userData)
			res.redirect('/auth/login')
		} catch (err) {
			res.status(500).render('auth/register', {
				errors: { username: ['Email is already taken'] },
				user: req.body,
			})
		}
	}

	static registerForm(req, res) {
		res.render('auth/register', {
			user: null, errors: []
		})
	}

	static loginForm(req, res) {
		const msg = req.flash('error')
		const messages = msg ? msg : null
		res.render('auth/login', {
			messages,
			user: null,
			errors: []
		})
	}
}

export default UserController
