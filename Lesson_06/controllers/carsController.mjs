import Car from '../models/Car.mjs'
import { validationResult } from 'express-validator'
import fs from 'fs'
import path from 'path'

class CarsController {
  static getCars(req, res) {
    const carsList = Car.getCarsList()
    
    res.render('cars/carsList', {
      cars: carsList,
    })
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
        errors: errorMessages,
      })
    }

    const carData = req.body
    req.file ? carData.image = req.file.filename : carData.image = req.body.existingImagePath
    Car.addNewCar(carData)
    res.redirect('/cars')
  }

  static carDetail(req, res) {
    const id = req.params.id
    const car = Car.getCarById(id)
    res.render('cars/carDetail', {
      car,
    })
  }

  static carForm(req, res) {
    const car = req.params.id ? Car.getCarById(req.params.id) : null
    res.render('cars/carForm', {
      car, errors: []
    })
  }

  static updateCar(req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      const car = req.body
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
        errors: errorMessages,
      })
    }
    const carNewData = req.body
    req.file ? carNewData.image = req.file.filename : carNewData.image = req.body.existingImagePath
    const car = Car.getCarById(req.params.id)
    if (car.image != carNewData.image) {
      fs.unlinkSync(path.join('public', 'images', car.image))
    }
    Car.updateCar(req.params.id, carNewData)
    res.redirect('/cars')
  }

  static deleteCar(req, res) {
    const id = req.params.id
    const car = Car.getCarById(id)
    if (car.image) {
      fs.unlinkSync(path.join('public', 'images', car.image))
    }
    Car.deleteCarById(id)
    res.redirect('/cars')
  }
}

export default CarsController
