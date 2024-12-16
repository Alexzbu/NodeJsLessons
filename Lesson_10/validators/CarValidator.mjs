class CarValidator {

  static carSchema = {
    brand: {
      notEmpty: {
        errorMessage: 'Марка автомобіля обов’язкова',
      },
      isLength: {
        options: { min: 2, max: 20 },
        errorMessage: 'Марка автомобіля має бути від 2 до 20 символів',
      },
      trim: true,
      escape: true,
    },
    year: {
      isInt: {
        options: { min: 1900, max: new Date().getFullYear() },
        errorMessage: 'Рік випуску має бути числом від 1900 до поточного року',
      }
    },
    number: {
      matches: {
        options: /^[А-ЯІЇЄA-Z]{2}\d{4}\d?[А-ЯІЇЄA-Z]{2}$/,
        errorMessage: 'Номер має бути у форматі АА0000АА'
      }
    },
    carImage: {
      custom: {
        options: (value, { req }) => req.file || req.body.existingImagePath ? true : false,
        errorMessage: 'Зображення є обов’язковим'
      }
    }
  }
}

export default CarValidator
