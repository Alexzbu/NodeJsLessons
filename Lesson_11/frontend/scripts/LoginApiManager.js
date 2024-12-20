// Клас для керування запитами на аутентифікацію
class LoginApiManager {
  static async login(data, callback) {
    return RequestManager.doPostRequest(
      '/auth/login',
      data,
      '../products/list.html',
      callback,
      false
    )
  }
  static async signup(data,) {
    return RequestManager.doPostRequest(
      '/auth/signup',
      data,
      './login.html',
      false
    )
  }
}
