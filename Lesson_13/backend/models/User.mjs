import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const { Schema } = mongoose


const userSchema = new Schema({
   username: {
      type: String,
      required: [true, 'Email is required'],
      unique: [true, 'Email is already taken'],
      validate: {
         validator: function (v) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
         },
         message: (props) =>
            'Invalid email format',
      },
   },
   password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password must be at least 6 characters long'],
      validate: {
         validator: function (v) {
            return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(v)
         },
         message: (props) =>
            'The password must contain at least one letter, one number, one special and at least 8 characters.',
      },
   },
   type: {
      type: Schema.Types.ObjectId,
      ref: 'Type',
   },
})

async function hashPassword(password) {
   const salt = await bcrypt.genSalt(10)
   return bcrypt.hash(password, salt)
}

userSchema.pre('save', async function (next) {
   if (!this.isModified('password')) return next()
   this.password = await hashPassword(this.password)
   next()
})

userSchema.pre('findOneAndUpdate', async function (next) {
   if (!this._update.password) {
      return next();
   }
   const salt = await bcrypt.genSalt(10);
   this._update.password = await bcrypt.hash(this._update.password, salt);
   next();
});

userSchema.methods.validPassword = async function (password) {
   const isMatch = await bcrypt.compare(password, this.password)

   return isMatch
}

const User = mongoose.model('User', userSchema)
export default User
