
import React from 'react';
import expect from 'expect';
import {mount, shallow} from 'enzyme';
import TestUtils from 'react-addons-test-utils';
import CourseForm from './courseForm';

function setup(save){
  const props = {
    course: {}, loading: save, errors: {},
    onSave: ()=>{},
    onClick: ()=>{}
  };

  return shallow(<CourseForm {...props}/>);
}
describe("Testing react component with Enzyme", ()=>{
  it("renders form And H1", ()=>{
    const wrapper = setup(false);

    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('h1').text()).toBe(' Manage Course ');
  });

  it('save Button is labelled save when not saving', ()=>{
    const wrapper = setup(false);
    expect(wrapper.find('input').props().value).toBe('Save');
  });

  it('save Button is labelled saving.. when not saving', ()=>{
    const wrapper = setup(true);
    expect(wrapper.find('input').props().value).toBe('Saving ...');
  });
});
