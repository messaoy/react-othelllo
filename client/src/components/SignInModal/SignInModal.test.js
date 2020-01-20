import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { SignInModal } from './SignInModal';

Enzyme.configure({ adapter: new Adapter() });

let wrapper;
beforeEach(() => {
  const toggleModal = jest.fn();
  const connect = jest.fn();
  wrapper = shallow(<SignInModal toggleModal={toggleModal} connect={connect} />);
});

describe('Modal signIn tests', () => {
  it('Should exist', () => {
    expect(wrapper).toBeDefined();
    expect(wrapper.exists()).toBe(true);
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('Should have id #modalLogin', () => {
    const container = wrapper.find('#modalLogin');
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

  it('Should change password state with handle change on passwordInput', () => {
    const input = wrapper.find('#passwordInput');
    const mockEvent = {
      target: {
        name: 'password',
        value: 'test',
      },
    };
    input.simulate('change', mockEvent);
    expect(wrapper.state().password).toEqual('test');
  });

  it('Should have cancel button', () => {
    const container = wrapper.find('#cancelButton');
    expect(container).toHaveLength(1);
  });

  it('Should call toggleModal() props on cancel button click', () => {
    const button = wrapper.find('#cancelButton');
    const toggle = wrapper.instance().props.toggleModal;
    button.simulate('click');
    expect(toggle).toHaveBeenCalled();
  });
});
