import Car from '../../models/car/Car.mjs'
import mongoose from 'mongoose'

class CarService {
  static async getCarsList() {
    try {

      return await Car.find({})

    } catch (error) {
      return []
    }
  }

  static async addNewCar(data) {
    const car = new Car(data)
    return await car.save()
  }

  static async getCarById(id) {
    return await Car.findById(id)
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
