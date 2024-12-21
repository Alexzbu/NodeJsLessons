import User from './User.mjs'
import MongooseCRUDManager from '../MongooseCRUDManager.mjs'

class UsersDBService extends MongooseCRUDManager {
  async getList(filters) {
    try {
      const res = await super.getList(filters, { password: 0 })
      return res
    } catch (error) {
      return []
    }
  }

  async update(id, data) {
    return await User.findOneAndUpdate({ _id: id }, data)
  }
}

export default new UsersDBService(User)
