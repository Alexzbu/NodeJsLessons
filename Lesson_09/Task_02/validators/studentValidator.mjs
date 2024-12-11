class StudentValidator {

  static studentSchema = {
    name: {
      notEmpty: {
        errorMessage: 'Name is required',
      },
      isLength: {
        options: { min: 2, max: 20 },
        errorMessage: 'Name should contain from 2 to 50 characters',
      },
      trim: true,
      escape: true,
    },
    age: {
      notEmpty: {
        errorMessage: 'Age is required',
      },
      isInt: {
        options: { min: 16, },
        errorMessage: 'Age must be at least 16',
      }
    },
    averageGrade: {
      notEmpty: {
        errorMessage: 'Average grade is required'
      },
      escape: true,
    }
  }
}

export default StudentValidator
