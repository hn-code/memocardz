import React, { useEffect, useState } from 'react'

export const Timer = ({ endGame, timeCD }) => {

  const [seconds, setSeconds] = useState(0);
  const [endTime, setEndTime] = useState(0);

  useEffect(() => {
    if (timeCD === 0) {
      if (endGame === false) {
        const chrono = setInterval(() => {
          setSeconds(seconds + 1)
        }, 1000)
        return () => clearInterval(chrono)
      }
    }
  }, [seconds, timeCD]);

  let secondsAdapted = seconds % 60;
  let minutesAdapted = Math.floor(seconds / 60)

  if (secondsAdapted < 10) {
    secondsAdapted = `0${secondsAdapted}`
  }

  if (minutesAdapted < 10) {
    minutesAdapted = `0${minutesAdapted}`
  }

  return (
    <div className='chronometer'>{timeCD === 0
      ? `${minutesAdapted}:${secondsAdapted}`
      : '00:00'}</div>
  )
}
