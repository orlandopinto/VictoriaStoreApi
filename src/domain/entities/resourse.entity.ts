import { resourseSchema } from "../../data/mongodb";

export class ResourseEntity {

     constructor(
          public id: string,
          public resourseName: string
     ) { }

}

export class DeleteResourseEntity {

     constructor(
          public resourseName: string,
          public message: string
     ) { }

}

export class GetResourseEntity {

     constructor(
          public resourses: [typeof resourseSchema][],
     ) { }

}