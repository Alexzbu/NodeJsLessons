import Car from '../models/Car.mjs'
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
    const carData = req.body
    if(req.file){
      carData.image = req.file.filename
    }
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
      car,
    })
  }

  static updateCar(req, res) {
    const carData = req.body
    if(req.file){
      carData.image = req.file.filename
    }
    Car.updateCar(req.params.id, carData)
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
