import CarService from '../services/CarService.mjs'
import LocationService from '../services/LocationService.mjs'
import { validationResult } from 'express-validator'
import fs from 'fs'
import path from 'path'

class CarsController {
  static async getCars(req, res) {
    try {
      const carsList = await CarService.getCarsList()

      res.render('cars/carsList', {
        cars: carsList,
        user: req.user
      })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }

  static createCar(req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      const car = req.body
      req.file ? car.image = req.file.filename : car.image = req.body.existingImagePath
      const errorMessages = {}
      errors.array().forEach(error => {
        if (!errorMessages[error.path]) {
          errorMessages[error.path] = []
        }
        errorMessages[error.path].push(error.msg)
      })
      return res.status(400).render('cars/carForm', {
        car,
        user: req.user,
        errors: errorMessages,
      })
    }

    const carData = req.body
    req.file ? carData.image = req.file.filename : carData.image = req.body.existingImagePath
    CarService.addNewCar(carData)
    res.redirect('/cars')
  }

  static async carDetail(req, res) {
    try {
      const id = req.params.id
      const car = await CarService.getCarById(id)
      res.render('cars/carDetail', {
        car,
        user: req.user,
      })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }

  static async carForm(req, res) {
    try {
      const car = req.params.id ? await CarService.getCarById(req.params.id) : null
      const locations = await LocationService.getLocationsList()
      res.render('cars/carForm', {
        car,
        locations: locations,
        user: req.user,
        errors: []
      })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }

  static async updateCar(req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      const car = req.body
      const locations = await LocationService.getLocationsList()
      car.id = req.params.id
      req.file ? car.image = req.file.filename : car.image = req.body.existingImagePath
      const errorMessages = {}
      errors.array().forEach(error => {
        if (!errorMessages[error.path]) {
          errorMessages[error.path] = []
        }
        errorMessages[error.path].push(error.msg)
      })
      return res.status(400).render('cars/carForm', {
        car,
        locations,
        user: req.user,
        errors: errorMessages,
      })
    }
    try {
      const carNewData = req.body
      req.file ? carNewData.image = req.file.filename : carNewData.image = req.body.existingImagePath
      const car = await CarService.getCarById(req.params.id)
      if (car.image != carNewData.image) {
        fs.unlinkSync(path.join('public', 'images', car.image))
      }
      await CarService.updateCar(req.params.id, carNewData)
      res.redirect('/cars')
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }

  static async deleteCar(req, res) {
    try {
      const id = req.params.id
      const car = await CarService.getCarById(id)
      if (car.image) {
        fs.unlinkSync(path.join('public', 'images', car.image))
      }
      await CarService.deleteCar(id)
      res.redirect('/cars')
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }
}

export default CarsController
