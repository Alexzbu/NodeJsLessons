class UsersApiManager {
  static async getUsers() {
    return RequestManager.fetchData('/users')
  }
  static async addUser(data, id) {
    return RequestManager.doPostRequest(`/users/add/${id}`, data, './list.html')
  }
  static async getUserById(id) {
    return RequestManager.fetchData(`/users/${id}`)
  }
  static async deleteUser(id) {
    return RequestManager.deleteRequest('/users', id)
  }
}
