import mongoose, { Schema } from "mongoose";

const resourseSchema = new Schema
     (
          {
               resourseName: { type: String, required: [true, 'Resourse name is required'], unique: true, trim: true }
          },
          { versionKey: false }
     )

export const ResourseModel = mongoose.model('Resourses', resourseSchema);