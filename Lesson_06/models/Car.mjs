import dataFileManager from '../utils/DataFileManager.mjs'
import { v4 as uuidv4 } from 'uuid';
class Car {
  static getCarsList() {
    try {
      return dataFileManager.loadData()
    } catch (error) {
      throw new Error('Не вдалось заватажити список продуктів')
    }
  }
  static addNewCar(carData) {
    try {
      dataFileManager.addItem({ id: uuidv4(), ...carData })
    } catch (error) {
      throw new Error('Операція з даними не пройшла!')
    }
  }

  static updateCar(id, carData) {
    try {
      dataFileManager.updateItemById(id, carData)
    } catch (error) {
      throw new Error('Операція з даними не пройшла!')
    }
  }
  
  static getCarById(id) {
    try {
      return dataFileManager.getItemById(id)
    } catch (error) {
      throw new Error('Операція з даними не пройшла!')
    }
  }
  
  static deleteCarById(id) {
    try {
      dataFileManager.deleteItemById(id)
    } catch (error) {
      throw new Error('Операція з даними не пройшла!')
    }
  }
}

export default Car
