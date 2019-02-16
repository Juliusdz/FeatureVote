// import {Injectable} from "@angular/core";
// import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
// import {Observable} from "rxjs";
// import {select, Store} from "@ngrx/store";
// import {filter, first, tap} from "rxjs/operators";



// @Injectable()
// export class CourseResolver implements Resolve<Course> {

//     constructor(
//         private coursesService:CoursesService,
//         private store: Store<AppState>) {

//     }

//     resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Course> {

//         const courseId = route.params['id'];

//         return this.store
//           .pipe(
//             select(selectCourseById(courseId)),
//             tap(course => {
//               if (!course) {
//                 this.store.dispatch(new CourseRequested({courseId}));
//               }
//             }),
//             filter(course => !!course),
//             first()
//           )

//     }

// }