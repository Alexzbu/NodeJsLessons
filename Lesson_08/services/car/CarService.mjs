import Car from '../../models/car/Car.mjs'

class CarService {
  static async getCarsList() {
    try {

      return await Car.find({}).populate('location')

    } catch (error) {
      return []
    }
  }

  static async addNewCar(data) {
    const car = new Car(data)
    return await car.save()
  }

  static async getCarById(id) {
    return await Car.findById(id).populate('location')
  }

  static async updateCar(id, data) {
    return await Car.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    })
  }

  static async deleteCar(id) {
    return await Car.findByIdAndDelete(id)
  }
}

export default CarService
