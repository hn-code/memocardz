import React from 'react'
import './ModalEnd.css'

export const ModalEnd = ({ name, scoreTime, moves}) => {
  return (
    <div className='modalEnd'>
      <p className='modalName'>{name}, tu tiempo fue:</p>
      <p className='modalScoreTime'>{scoreTime}</p>
      <p className='modalMoves'>Con un total de {moves} movimientos</p>
    </div>
  )
}
