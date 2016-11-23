import * as types from './actionConstants';
import courseApi, {generateId} from '../api/mockCourseApi';
import beginAjaxCall, {errorAjaxCall} from './ajaxStatusActions';
export function createCourseSuccess(course) {
  return {
    type: types.CREATE_COURSE_SUCCESS,
    course
  };
}

export function updateCourseSuccess(course) {
  return {
    type: types.UPDATE_COURSE_SUCCESS,
    course
  };
}
export function loadCoursesSuccess(courses) {
  return {
    type: types.LOAD_COURSES_SUCCESS,
    courses
  };
}

export function loadCourses(){
  return (dispatch) => {
    dispatch(beginAjaxCall());
    return courseApi.getAllCourses().then(courses => {
      dispatch(loadCoursesSuccess(courses));
    }).catch( e => {
      throw(e);
    });
  };
}

export function saveCourse(course){
  return (dispatch, getState) => {
    dispatch(beginAjaxCall());
    return courseApi.saveCourse(course).then( savedCourse => {
      // savedCourse.id ? dispatch(updateCourseSuccess(savedCourse)) : dispatch(createCourseSuccess(savedCourse));
      if(savedCourse.id){
        dispatch(updateCourseSuccess(savedCourse));
      } else {
        savedCourse.id = generateId(course);
        savedCourse.watchHref = `http://www.pluralsight.com/courses/${savedCourse.id}`;
        dispatch(createCourseSuccess(savedCourse));
      }
    }).catch(error => {
      dispatch(errorAjaxCall());
      throw(error);
    });
  };
}
// CREATE_COURSE_SUCCESS
