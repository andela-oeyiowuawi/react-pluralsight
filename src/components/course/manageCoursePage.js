import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseForm from './courseForm';
import toastr from 'toastr';
import authorsFormattedForDropdown from '../../selectors/selectors';
export class ManageCoursePage extends React.Component {
  constructor(props, context){
    super(props, context);
    this.state = {
      course: this.props.course,
      errors: {},
      saving: false
    };
    this.updateCourseFormState = this.updateCourseFormState.bind(this);
    this.saveCourse = this.saveCourse.bind(this);
  }
  componentWillReceiveProps(nextProps){
    if(this.state.course.id != nextProps.course.id) {
      this.setState({
        course: Object.assign({}, nextProps.course)
      });
    }
  }
  isFormValid(){
    let formISValid = true;
    let errors = {};

    if(this.state.course.title.length < 5){
      errors.title = "Title must be greater than 5";
      formISValid = false;
    }
    this.setState({errors: errors});
    return formISValid;
  }

  saveCourse(event){
    event.preventDefault();
    if(!this.isFormValid()){
      return;
    }
    this.setState({saving: true});
    this.props.actions.saveCourse(this.state.course).then(()=>{
      this.redirect();
    }).catch(err => {
      toastr.error(err);
      this.setState({saving: false});
    });
    // this.context.router.push('/courses');
    // browserHistory.push('/courses');

  }

  redirect(){
    this.setState({saving: false});
    toastr.success('Course saved');
    this.context.router.push('/courses');

  }
  updateCourseFormState(event){
    let field = event.target.name;
    let course = this.state.course;
    course[field] = event.target.value;
    return this.setState({
      course: course
    });
  }

  render() {
    return(
        <CourseForm
          loading={this.state.saving}
          onSave={this.saveCourse}
          onChange={this.updateCourseFormState}
          course={this.state.course}
          errors={this.state.errors}
          allAuthors={this.props.authors} />
    );
  }

}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

ManageCoursePage.contextTypes = {
  router: PropTypes.object
};

function getCourseById(courses, id){
  const course = courses.filter( course => course.id === id );
  if(course.length > 0) return course[0];
  return null;
}

function mapStateToprops(state, ownProps){
  const courseId = ownProps.params.id;
  let course = {id: '', watchHref: '', title: '', authorId: '', length: '', category: ''};

  if(courseId && state.courses.length > 0) {
    course = getCourseById(state.courses, courseId);
  }

  
  return {
    course: course,
    authors: authorsFormattedForDropdown(state.authors)
  };
}


function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}

export default connect(mapStateToprops, mapDispatchToProps)(ManageCoursePage);
