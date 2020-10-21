import mongoose from 'mongoose'

import { IUser } from '../interfaces/IUser'

const User = new mongoose.Schema(
   {
      name: {
         type: String,
         required: [true, 'Please enter a full name'],
         index: true,
      },
      email: {
         type: String,
         lowercase: true,
         unique: true,
         index: true,
      },
      password: { type: String, required: true },
      age: { type: Number, required: false },
      city: String,
      country: String,
      birthday: Date,
      message: String,
      position: String,
      responsibilities: Array,
      department: String,
      supervisor: String,
      skills: Array,
      phone_number: Number,
      github: String,
      salt: String,
      role: {
         type: String,
         default: 'user',
      },
   },
   { timestamps: true },
)

export default mongoose.model<IUser & mongoose.Document>('User', User)
