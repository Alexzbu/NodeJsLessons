import CarService from '../services/CarService.mjs'
import { validationResult } from 'express-validator'

class CarsController {
  static async getCars(req, res) {
    try {
      const carsList = await CarService.getCarsList(req.query)
      res.status(200).json(carsList)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }

  static async createCar(req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      const errorMessages = {}
      errors.array().forEach(error => {
        errorMessages[error.path] = error.msg
      })
      return res.status(400).json(errorMessages)
    }

    const carData = req.body
    if (req.file?.buffer) {
      carData.image = "data:image/jpeg;base64," + req.file.buffer.toString('base64')
    }
    if (req.params.id) {
      await CarService.updateCar(req.params.id, carData)
    } else {
      await CarService.addNewCar(carData)
    }
    res.status(200).json({ message: 'successful' })
  }

  static async carDetail(req, res) {
    try {
      const id = req.params.id
      const car = await CarService.getCarById(id)
      res.status(200).json({ car })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }

  static async deleteCar(req, res) {
    try {
      await CarService.deleteCar(req.params.id)
      res.status(200).json({ message: 'successful' })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }
}

export default CarsController
