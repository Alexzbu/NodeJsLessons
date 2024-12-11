class CourseValidator {

  static courseSchema = {
    name: {
      notEmpty: {
        errorMessage: 'Course name is reqired',
      },
      isLength: {
        options: { min: 2, max: 50 },
        errorMessage: 'Course name should contain from 2 to 50 characters',
      },
      trim: true,
      escape: true,
    },
    duration: {
      notEmpty: {
        errorMessage: 'Course duration is reqired',
      },
      isInt: {
        options: { min: 0, },
        errorMessage: 'Course duration can not be negative',
      }
    },
  }
}

export default CourseValidator
