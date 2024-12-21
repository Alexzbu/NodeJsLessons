class UserValidator {

  static userSchema = {
    username: {
      matches: {
        options: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        errorMessage: 'Invalid email format'
      },
    },
    password: {
      matches: {
        options: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        errorMessage: 'The password must contain at least one letter, one number, one special and at least 8 characters.'
      },
    }
  }
}

export default UserValidator
