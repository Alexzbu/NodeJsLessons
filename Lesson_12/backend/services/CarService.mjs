import Car from '../models/Car.mjs'

class CarService {
  static async getCarsList(reqQuery) {

    const { sort, filter, page = 1, limit = 1 } = reqQuery
    const skipNum = page * limit
    let sortOptions = {}
    if (sort) {
      const [field, order] = sort.split(':')
      sortOptions[field] = order === 'asc' ? 1 : -1
    }
    try {

      let query = Car.find({ brand: new RegExp(filter, 'i') })
      const count = await Car.countDocuments({ brand: new RegExp(filter, 'i') })
      if (sortOptions) {
        query.sort(sortOptions);
      }
      query.skip(skipNum)
      query.limit(limit)
      query.populate('location')
      const carList = await query.exec()
      return { carList, count }

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
