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

	static async getLocationById(req, res) {
		try {
			const location = await LocationService.getLocationById(req.params.id)

			res.status(200).json({ location })
		} catch (err) {
			res.status(500).json({ error: err.message })
		}
	}

	static async createLocation(req, res) {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			const errorMessages = {}
			errors.array().forEach(error => {
				errorMessages[error.path] = error.msg
			})
			return res.status(400).json(errorMessages)
		}

		const locationData = req.body
		if (req.params.id) {
			await LocationService.updateLocation(req.params.id, locationData)
		} else {
			await LocationService.addNewLocation(locationData)
		}
		res.status(200).json({ message: 'successful' })
	}



	static async deleteLocation(req, res) {
		try {
			await LocationService.deleteLocation(req.params.id)
			res.status(200).json({ message: 'successful' })
		} catch (err) {
			res.status(500).json({ error: err.message })
		}
	}
}

export default LocationController
