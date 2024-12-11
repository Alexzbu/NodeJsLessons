import mongoose from 'mongoose'

const { Schema } = mongoose

const studentSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    minLength: [2, 'Name must be at least 2 characters long'],
    maxlength: [20, 'Name must be at most 20 characters long'],
    trim: true,
  },
  age: {
    type: Number,
    required: [true, 'Age is required'],
    min: [16, 'Age must be at least 16'],
  },
  averageGrade: {
    type: Number,
    required: [true, 'Average grade is required'],
    min: [0, 'Average grade cannot be negative'],
  },
})

const Student = mongoose.model('Student', studentSchema)
export default Student
