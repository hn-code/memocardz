import React from 'react'
import './Countdown.css';

export const Countdown = ({ timeCD = 3 }) => {
  return (
    <div className='countdownScreen'>
      <p className='countdown'>
        {timeCD}
      </p>
    </div>
  )
}
