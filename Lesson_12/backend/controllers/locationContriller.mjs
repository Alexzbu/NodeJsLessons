import LocationService from '../services/LocationService.mjs'
import { validationResult } from 'express-validator'

class LocationController {
	static async getLocations(req, res) {
		try {
			const locationsList = await LocationService.getLocationsList()

			res.status(200).json(locationsList)
		} catch (err) {
			res.status(500).json({ error: err.message })
		}
	}

	static createLocation(req, res) {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			const location = req.body
			const errorMessages = {}
			errors.array().forEach(error => {
				if (!errorMessages[error.path]) {
					errorMessages[error.path] = []
				}
				errorMessages[error.path].push(error.msg)
			})
			return res.status(400).render('locations/locationForm', {
				location,
				user: req.user,
				errors: errorMessages,
			})
		}

		const locationData = req.body
		console.log(locationData)
		LocationService.addNewLocation(locationData)
		res.status(200).json({ message: 'successful' })
	}

	static async locationForm(req, res) {
		try {
			const location = req.params.id ? await LocationService.getLocationById(req.params.id) : null
			res.render('locations/locationForm', {
				location,
				user: req.user,
				errors: []
			})
		} catch (err) {
			res.status(500).json({ error: err.message })
		}
	}

	static async updateLocation(req, res) {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			const location = req.body
			const errorMessages = {}
			errors.array().forEach(error => {
				if (!errorMessages[error.path]) {
					errorMessages[error.path] = []
				}
				errorMessages[error.path].push(error.msg)
			})
			return res.status(400).render('locations/locationForm', {
				location,
				user: req.user,
				errors: errorMessages,
			})
		}
		try {
			const locationNewData = req.body
			await LocationService.updateLocation(req.params.id, locationNewData)
			res.redirect('/locations')
		} catch (err) {
			res.status(500).json({ error: err.message })
		}
	}

	static async deleteLocation(req, res) {
		try {
			await LocationService.deleteLocation(req.params.id)
			res.redirect('/locations')
		} catch (err) {
			res.status(500).json({ error: err.message })
		}
	}
}

export default LocationController
