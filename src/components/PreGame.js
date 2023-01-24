import React, { useEffect, useState } from 'react'
import { GameCards } from './GameCards';
import { Countdown } from './Countdown';

export const PreGame = () => {

  const [timeCD, setTimeCD] = useState(3)

  useEffect(() => {
    if (timeCD > 0) {
      const countdown = setInterval(() => {
        setTimeCD(timeCD - 1);
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [timeCD])

  return (
    <div>
      <GameCards timeCD={timeCD}/>
      {timeCD > 0 && <Countdown timeCD={timeCD} />}
    </div>
  )
}
