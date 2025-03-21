import dataFileManager from '../utils/DataFileManager.mjs'
import { v4 as uuidv4 } from 'uuid';
class Product {
  static getProductsList() {
    try {
      return dataFileManager.loadData()
    } catch (error) {
      throw new Error('Не вдалось заватажити список продуктів')
    }
  }
  static addNewProduct(productData) {
    try {
      dataFileManager.addItem({ id: uuidv4(), ...productData })
    } catch (error) {
      throw new Error('Операція з даними не пройшла!')
    }
  }

  static updateProduct(id, productData) {
    try {
      dataFileManager.updateItemById(id, productData)
    } catch (error) {
      throw new Error('Операція з даними не пройшла!')
    }
  }
  
  static getProductById(id) {
    try {
      return dataFileManager.getItemById(id)
    } catch (error) {
      throw new Error('Операція з даними не пройшла!')
    }
  }
  
  static deleteProductById(id) {
    try {
      dataFileManager.deleteItemById(id)
    } catch (error) {
      throw new Error('Операція з даними не пройшла!')
    }
  }
}

export default Product
