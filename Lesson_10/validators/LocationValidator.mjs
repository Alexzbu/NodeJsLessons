class LocationValidator {

    static locationSchema = {
     title: {
        notEmpty: {
          errorMessage: 'Назва локації обов’язкова',
        },
        isLength: {
          options: { min: 2, max: 20 },
          errorMessage: 'Назва локації має бути від 2 до 20 символів',
        },
        trim: true,
        escape: true,
      },
      address: {
        notEmpty: {
          errorMessage: 'Адреса обов’язкова',
        },
        isLength: {
          options: { min: 2, max: 20 },
          errorMessage: 'Адреса має бути від 2 до 20 символів',
        },
        trim: true,
        escape: true,
      },
    }
  }
  
  export default LocationValidator
  