import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Disk from './Disk';

Enzyme.configure({ adapter: new Adapter() });

let wrapper;
beforeEach(() => {
  wrapper = shallow(<Disk diskColor="BLACK" />);
});

describe('Disk tests', () => {
  it('Should exist', () => {
    expect(wrapper).toBeDefined();
    expect(wrapper.exists()).toBe(true);
  });

  it('Should have black disk if color is black', () => {
    const disk = wrapper.find('#blackDisk');
    expect(disk.exists()).toBe(true);
  });
  it('Should have white disk if color is white', () => {
    wrapper = shallow(<Disk diskColor="WHITE" />);
    const disk = wrapper.find('#whiteDisk');
    expect(disk.exists()).toBe(true);
  });
});
