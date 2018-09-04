import React from 'react';
import { shallow } from 'enzyme';
import { Chip } from '@collab-ui/react';

describe('<Chip />', () => {
  it('should match SnapShot', () => {
    const container = shallow(<Chip type="recording" />);

    expect(container).toMatchSnapshot();
  });

  it('should render the correct left content for a recording chip', () => {
    const container = shallow(<Chip type="recording"/>);
    expect(container.find('.cui-chip-left.recording').length).toEqual(1);
  });

  it('should render the correct content for a file chip', () => {
    const container = shallow(<Chip type="file" fileType="audio" fileDownloadLink="https://download-file-link"/>);
    expect(container.find('.cui-chip-left.file').length).toEqual(1);
    expect(container.find('.cui-file-download').prop('href')).toBe('https://download-file-link');
  });

  it('should accept a custom class', () => {
    const container = shallow(<Chip type="recording" className="custom-recording-class"/>);
    expect(container.find('.custom-recording-class').length).toEqual(1);
  });

  it('should render custom left content', () => {
    const leftContent = <div className="custom-left"/>;
    const container = shallow(<Chip leftContent={leftContent}/>);
    expect(container.find('.custom-left').length).toEqual(1);
  });

  it('should render custom right content', () => {
    const rightContent = <div className="custom-right"/>;
    const container = shallow(<Chip rightContent={rightContent}/>);
    expect(container.find('.custom-right').length).toEqual(1);
  });
});
