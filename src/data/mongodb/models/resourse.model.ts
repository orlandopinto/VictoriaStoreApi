import mongoose, { Schema } from "mongoose";

const resourseSchema = new Schema
     (
          {
               resourseName: { type: String, required: [true, 'Resourse name is required'], unique: true, lowercase: true, trim: true }
          },
          { timestamps: true }
     )

export const ResourseModel = mongoose.model('Resourses', resourseSchema);