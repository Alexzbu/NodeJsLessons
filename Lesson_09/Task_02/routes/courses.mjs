import CoursesController from '../controllers/coursesController.mjs'
import CourseValidator from '../validators/courseValidator.mjs'
import { checkSchema } from 'express-validator'
import { Router } from 'express'
const router = Router()

router.get('/', CoursesController.getCourses)

router.post('/add',
    checkSchema(CourseValidator.courseSchema),
    CoursesController.createCourse
)

router.get('/add/seminar/:id', CoursesController.seminarForm)

router.post('/add/seminar/:id', CoursesController.addSeminar)

router.get('/add/:id?', CoursesController.courseForm)

router.post('/add/:id?',
    checkSchema(CourseValidator.courseSchema),
    CoursesController.updateCourse
)

router.get('/delete/:id', CoursesController.deleteCourse)

router.get('/delete/seminar/:courseId&:seminarId', CoursesController.deleteSeminar)





export default router
