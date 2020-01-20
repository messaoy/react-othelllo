import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Cell from './Cell';

Enzyme.configure({ adapter: new Adapter() });

let wrapper;
beforeEach(() => {
  wrapper = shallow(<Cell diskColor="BLACK" x={0} y={0} />);
});

describe('Cell tests', () => {
  it('Should exist', () => {
    expect(wrapper).toBeDefined();
    expect(wrapper.exists()).toBe(true);
  });
  it('Should have black disk if color is black', () => {
    const disk = wrapper.find('#cellDiskBlack');
    expect(disk.exists()).toBe(true);
  });
  it('Should have white disk if color is white', () => {
    wrapper = shallow(<Cell diskColor="WHITE" x={0} y={0} />);
    const disk = wrapper.find('#cellDiskWhite');
    expect(disk.exists()).toBe(true);
  });
  it('Should have no disk if color is not white or black', () => {
    wrapper = shallow(<Cell diskColor="BLANK" x={0} y={0} />);
    const diskBlack = wrapper.find('#cellDiskBlack');
    expect(diskBlack.exists()).toBe(false);
    const diskWhite = wrapper.find('#cellDiskWhite');
    expect(diskWhite.exists()).toBe(false);
  });
});
