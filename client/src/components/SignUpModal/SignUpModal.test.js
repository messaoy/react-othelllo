import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { SignUpModal } from './SignUpModal';

Enzyme.configure({ adapter: new Adapter() });

let wrapper;
beforeEach(() => {
  const toggleModalSignUp = jest.fn();
  const connect = jest.fn();
  wrapper = shallow(<SignUpModal toggleModalSignUp={toggleModalSignUp} connect={connect} />);
});

describe('Modal signUp tests', () => {
  it('Should exist', () => {
    expect(wrapper).toBeDefined();
    expect(wrapper.exists()).toBe(true);
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('Should have id #modalLogin', () => {
    const container = wrapper.find('#modalSignUp');
    expect(container).toHaveLength(1);
  });

  it('Should have a submit button', () => {
    const container = wrapper.find('#submitButton');
    expect(container).toHaveLength(1);
  });

  it('Should change email state with handle change on emailInput', () => {
    const input = wrapper.find('#emailInput');
    const mockEvent = {
      target: {
        name: 'email',
        value: 'test',
      },
    };
    input.simulate('change', mockEvent);
    expect(wrapper.state().email).toEqual('test');
  });

  it('Should change name state with handle change on nameInput', () => {
    const input = wrapper.find('#nameInput');
    const mockEvent = {
      target: {
        name: 'name',
        value: 'test',
      },
    };
    input.simulate('change', mockEvent);
    expect(wrapper.state().name).toEqual('test');
  });

  it('Should have cancel button', () => {
    const container = wrapper.find('#cancelButton');
    expect(container).toHaveLength(1);
  });

  it('Should call toggleModal() props on cancel button click', () => {
    const button = wrapper.find('#cancelButton');
    const toggle = wrapper.instance().props.toggleModalSignUp;
    button.simulate('click');
    expect(toggle).toHaveBeenCalled();
  });
});
