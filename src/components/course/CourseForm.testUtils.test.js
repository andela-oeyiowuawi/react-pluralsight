import React from 'react';
import expect from 'expect';
import TestUtils from 'react-addons-test-utils';
import CourseForm from './courseForm';

function setUp(save = false){
  let props = {
    course: {}, loading: save, errors: {},
    onSave: ()=>{},
    onClick: ()=>{}
  };
  let renderer = TestUtils.createRenderer();
  renderer.render(<CourseForm {...props}/>);
  let output = renderer.getRenderOutput();

  return {
    props,
    output,
    renderer
  };
}
describe('CourseForm test with TestUtils', ()=>{
  it('renders h1 element', ()=>{
    const { output } = setUp(false);
    expect(output.type).toBe('form');
    let [ h1 ] = output.props.children;
    expect(h1.type).toBe('h1');
  });

  it('displays save when loading is false', ()=>{
    const { output } = setUp();
    let text = output.props.children[5];
    expect(text.props.value).toBe('Save');
  });

  it('displays saving when loading is true', ()=>{
    const { output } = setUp(true);
    let text = output.props.children[5];
    expect(text.props.value).toBe('Saving ...');
  });
});
