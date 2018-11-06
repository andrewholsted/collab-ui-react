import React from 'react';
import { Input, TimePicker } from '@collab-ui/react';
export default class Default extends React.PureComponent {
  render() {
    return (
      <div>
        <div className='timePicker-container'>
          <TimePicker
            minuteInterval={30}
            selectedTime={new Date()}
          />
        </div>
      </div>
    );
  }
}