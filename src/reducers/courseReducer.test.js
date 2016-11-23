import expect from 'expect';
import * as types from '../actions/actionConstants';
import courseReducer from './courseReducers';
import {createCourseSuccess} from "../actions/courseActions";

describe("Course Reducer", ()=>{
    describe("Create course reducer", ()=>{
      it("should add course to the state", ()=>{
        const initialState = [
          {title: "A"},
          {title: "B"}
        ];

        const newCourse = {title: "C"};
        let action = createCourseSuccess(newCourse);
        const newState = courseReducer(initialState, action);

        expect(newState.length).toEqual(3);
      });
    });
});
