import CourseService from '../services/courseService.mjs'
import StudentsService from '../services/studentsService.mjs'
import { validationResult } from 'express-validator'
import path from 'path'

class CoursesController {
  static async getCourses(req, res) {
    try {
      const courses = await CourseService.getCoursesList()
      res.render('courses/coursesList', {
        courses,
      })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }

  static async createCourse(req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      const course = req.body
      const students = await StudentsService.getStudenstList()
      const errorMessages = {}
      errors.array().forEach(error => {
        if (!errorMessages[error.path]) {
          errorMessages[error.path] = []
        }
        errorMessages[error.path].push(error.msg)
      })
      return res.status(400).render('courses/courseForm', {
        course,
        students,
        errors: errorMessages,
      })
    }

    const courseData = req.body
    courseData.students = courseData.studentId
    CourseService.addNewCourse(courseData)
    res.redirect('/courses')
  }

  static async courseForm(req, res) {
    try {
      const course = req.params.id ? await CourseService.getCourseById(req.params.id) : null
      const students = await StudentsService.getStudenstList()
      res.render('courses/courseForm', {
        course,
        students,
        errors: []
      })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }

  static async seminarForm(req, res) {
    try {
      const courseId = req.params.id
      const students = await StudentsService.getStudenstList()
      res.render('seminars/addSeminar', {
        courseId,
        students,
        errors: []
      })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }

  static async addSeminar(req, res) {
    try {
      const { topic, studentId, duration } = req.body
      const course = await CourseService.getCourseById(req.params.id)
      course.seminars.push({ topic, student: studentId, duration })
      const seminarId = course.seminars.some(s => s.id)
      await course.save()
      res.redirect('/courses')
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }

  static async deleteSeminar(req, res) {
    try {
      const seminarId = req.params.seminarId
      const courseId = req.params.courseId
      const course = await CourseService.getCourseById(courseId)
      course.seminars.splice(seminarId, 1)
      course.save()
      res.redirect('/courses')
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }

  static async updateCourse(req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      const course = req.body
      const studens = await StudentsService.getStudenstList()
      course.id = req.params.id
      const errorMessages = {}
      errors.array().forEach(error => {
        if (!errorMessages[error.path]) {
          errorMessages[error.path] = []
        }
        errorMessages[error.path].push(error.msg)
      })
      return res.status(400).render('courses/courseForm', {
        course,
        studens,
        errors: errorMessages,
      })
    }
    try {
      const courseNewData = req.body
      courseNewData.students = courseNewData.studentId
      await CourseService.updateCourse(req.params.id, courseNewData)
      res.redirect('/courses')
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }

  static async deleteCourse(req, res) {
    try {
      const id = req.params.id
      await CourseService.deleteCourse(id)
      res.redirect('/courses')
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }
}

export default CoursesController
