import { resourseSchema } from "../../data/mongodb";

export class AddResourseEntity {

     constructor(
          public id: string,
          public resourseName: string
     ) { }

}

export class DeleteResourseEntity {

     constructor(
          public resourseName: string
     ) { }

}

export class GetResourseEntity {

     constructor(
          public resourses: [typeof resourseSchema][],
     ) { }

}