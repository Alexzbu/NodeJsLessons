import Location from '../models/Location.mjs'

class LocationService {
	static async getLocationsList() {
		try {

			return await Location.find({})

		} catch (error) {
			return []
		}
	}

	static async addNewLocation(data) {
		const location = new Location(data)
		return await location.save()
	}

	static async getLocationById(id) {
		return await Location.findById(id)
	}

	static async updateLocation(id, data) {
		return await Location.findByIdAndUpdate(id, data, {
			new: true,
			runValidators: true,
		})
	}

	static async deleteLocation(id) {
		return await Location.findByIdAndDelete(id)
	}
}

export default LocationService
