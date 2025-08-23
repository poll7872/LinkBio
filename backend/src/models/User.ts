import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  handle: string
  name: string
  email: string
  password: string
  description: string
  url_image: string
  links: string
}

const userSchema = new Schema({
  handle: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    require: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    require: true,
    trim: true,
  },
  description: {
    type: String,
    default: ''
  },
  url_image: {
    type: String,
    default: ''
  },
  links: {
    type: String,
    default: '[]'
  }
})

const User = mongoose.model<IUser>('User', userSchema)
export default User
