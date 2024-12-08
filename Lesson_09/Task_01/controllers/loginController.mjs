
class LoginController {
  static login(req, res) {
    res.render('login', { error: null })
  }

  static checkLogin(req, res) {
    const { username } = req.body
    if (!username || username.length < 3) {
      return res.render('login', { error: 'Ім’я користувача має бути не менше 3 символів' })
    }
    req.session.username = username
    res.redirect('/products?sort=asc')
  }
}

export default LoginController
