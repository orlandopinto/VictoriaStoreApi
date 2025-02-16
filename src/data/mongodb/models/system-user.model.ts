import mongoose, { Schema } from "mongoose";

export const permissionsByUserSchema = new Schema
     ({
          roleId: { type: String, required: true },
          resourseId: { type: String, required: true },
          actionId: { type: String, required: true }
     })

const systemUserSchema = new Schema
     (
          {
               email: { type: String, required: [true, 'Email is required'], unique: true, lowercase: true },
               password: { type: String, required: [true, 'Password is required'] },
               firstName: { type: String, default: null },
               lastName: { type: String, default: null },
               phoneNumber: { type: String, default: null },
               imageProfilePath: { type: String, default: null },
               city: { type: String, default: null },
               zipcode: { type: Number, default: null },
               lockoutEnabled: { type: Boolean, default: 0 },
               accessFailedCount: { type: Number, default: 0 },
               address: { type: String, default: null },
               birthDate: { type: Date, default: null },
               roles: { type: [String], default: null },
               permissionsByUser: { type: [permissionsByUserSchema], default: [] }
          },
          { timestamps: true, versionKey: false }
     )

export const SystemUserModel = mongoose.model('SystemUsers', systemUserSchema);
/*
roles:[
           //admin                                // user
          "0989c250-4637-4b32-9daf-7c94863b0311","496ba21c-707d-48e0-be89-65b6c9d1cdfa"
],
authorizations:[
     {
          roleId:"0989c250-4637-4b32-9daf-7c94863b0311",         // admin
          resourseId:"663ce6f9-377e-415a-9aef-3f701a3dd473",     // users
          actionId:"3f561d7f-b2a5-48d4-a1f7-6285698e8091"        // list
     },
      {
          roleId:"0989c250-4637-4b32-9daf-7c94863b0311",         // admin
          resourseId:"663ce6f9-377e-415a-9aef-3f701a3dd473",     // users
          actionId:"3f561d7f-b2a5-48d4-a1f7-6285698e8091"        // create
     },
      {
          roleId:"0989c250-4637-4b32-9daf-7c94863b0311",         // admin
          resourseId:"663ce6f9-377e-415a-9aef-3f701a3dd473",     // users
          actionId:"3f561d7f-b2a5-48d4-a1f7-6285698e8091"        // edit
     },
      {
          roleId:"496ba21c-707d-48e0-be89-65b6c9d1cdfa",         // admin
          resourseId:"663ce6f9-377e-415a-9aef-3f701a3dd473",     // taxes
          actionId:"3f561d7f-b2a5-48d4-a1f7-6285698e8091"        // list"
     },
]

// permissions
permissions: {
     roles:[
          {
               id:"0989c250-4637-4b32-9daf-7c94863b0311",
               roleName:"admin"
          },
          {
               id:"496ba21c-707d-48e0-be89-65b6c9d1cdfa",
               roleName:"user"
          }
     ],
     resourses:[
          {
               id:"0989c250-4637-4b32-9daf-7c94863b0311",
               resourseName:"users"
          },
          {
               id:"496ba21c-707d-48e0-be89-65b6c9d1cdfa",
               resourseName:"taxes"
          }
     ],
     actions:[
          {
               id:"0989c250-4637-4b32-9daf-7c94863b0311",
               resourseName:"create"
          },
          {
               id:"496ba21c-707d-48e0-be89-65b6c9d1cdfa",
               resourseName:"delete"
          }
     ]
}


*/