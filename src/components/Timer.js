import React, { useContext, useEffect, useState } from 'react'
import { playerContext } from '../providers/PlayerProvider';
import './Timer.css'

export const Timer = ({ endGame, timeCD }) => {

  const [seconds, setSeconds] = useState(0);
  const {saveScore} = useContext(playerContext);

  useEffect(() => {
    if (timeCD === 0) {
      if (endGame === false) {
        const chrono = setInterval(() => {
          setSeconds(seconds + 1)
        }, 1000)
        return () => clearInterval(chrono)
      }
    }
  }, [seconds, timeCD, endGame]);

  let secondsAdapted = seconds % 60;
  let minutesAdapted = Math.floor(seconds / 60)

  if (secondsAdapted < 10) {
    secondsAdapted = `0${secondsAdapted}`
  }

  if (minutesAdapted < 10) {
    minutesAdapted = `0${minutesAdapted}`
  }

  useEffect(() => {
    if(endGame){
      saveScore(`${minutesAdapted}:${secondsAdapted}`)
    }
  },[endGame])

  return (
    <div className='chronometer' id='timer'>{timeCD === 0
      ? `${minutesAdapted}:${secondsAdapted}`
      : '00:00'}</div>
  )
}
