import StudentsController from '../controllers/studentsController.mjs'
import StudentValidator from '../validators/studentValidator.mjs'
import { checkSchema } from 'express-validator'
import { Router } from 'express'
const router = Router()

router.get('/', StudentsController.getStudents)

router.post('/add',
    checkSchema(StudentValidator.studentSchema),
    StudentsController.createStudent
)

router.get('/add/:id?', StudentsController.studentForm)

router.post('/add/:id?',
    checkSchema(StudentValidator.studentSchema),
    StudentsController.updateStudent
)

router.get('/delete/:id', StudentsController.deleteStudent)



export default router
