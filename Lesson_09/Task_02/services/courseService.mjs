import Course from '../models/course.mjs'

class CourseService {
  static async getCoursesList() {
    try {

      return await Course.find({}).populate('students seminars.student')

    } catch (error) {
      return []
    }
  }

  static async addNewCourse(data) {
    const course = new Course(data)
    return await course.save()
  }

  static async updateCourse(id, data) {
    return await Course.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    })
  }

  static async getCourseById(id) {
    return await Course.findById(id).populate('students')
  }

  static async deleteCourse(id) {
    return await Course.findByIdAndDelete(id)
  }
}

export default CourseService
