import mongoose from 'mongoose'

const { Schema } = mongoose

const seminarSchema = new Schema({
  topic: {
    type: String,
    required: [true, 'Topic of siminar is required'],
    minLength: [2, 'Topic of siminar must be at least 2 charcters long'],
    maxLength: [50, 'Topic of siminar must be at most 50 characters long'],
    trim: true,
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  duration: {
    type: Number,
    required: [true, 'Duration is required'],
    min: [0, 'Duration can not be negativ'],
  },
})

const courseSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name of course is required'],
    minLength: [2, 'Name of course must be at least 2 charcters long'],
    maxLength: [50, 'Name of course must be at most 50 characters long'],
    trim: true,
  },
  duration: {
    type: Number,
    equired: [true, 'Duration is required'],
    min: [0, 'Duration can not be negative'],
  },
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student'
  }],
  seminars: [seminarSchema],
})

const Course = mongoose.model('Course', courseSchema)
export default Course