import expect from 'expect';
import * as types from './actionConstants';
import * as courseActions from './courseActions';
import thunk from 'redux-thunk';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';


const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Asyc calls', ()=>{
  afterEach(()=>{
    nock.cleanAll();
  });

  it("Should Create BEGIN_AJAX_CALL and LOAD_COURE_SUCCESS when loading courses", (done)=>{
    // this.timeout(15000);

    //Here's an example of how to use nock to mock external api calls
    // nock('api.example.com').get(/courses).reply(200, { body: { courses: [id: 1, title: "Pure Javascript"]}})
    const expectedActions = [
      {type: types.BEGIN_AJAX_CALL},
      {type: types.LOAD_COURSES_SUCCESS, body: {courses: [{id: 'clean-code', title: 'clean code'}]}}
    ];

    const store = mockStore({courses: []}, expectedActions);
    store.dispatch(courseActions.loadCourses()).then(()=>{
      const actions = store.getActions;

      expect(actions[0].type).toEqual(types.BEGIN_AJAX_CALL);
      expect(actions[1].type).toEqual(types.LOAD_COURSES_SUCCESS);
    });
    done();
  });
});
