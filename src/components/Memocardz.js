import React, { useState } from 'react';
import './Memocardz.css';
import { Link } from 'react-router-dom'
import gameLogo from '../imgs/memocardz-logo.png'

export const Memocardz = () => {

  const [player, setPlayer] = useState('')

  const handleChange = (e) => {
    const name = e.target.value;
    setPlayer(name)
  }

  const handleSubmit = (e) => {
    if(player === ''){
      e.preventDefault();
    }
  }

  //Agregar useContext que guarde:
  //Nombre del jugador, tiempo que demoró
  //Agregar una base de datos de firebase

  return (
    <div className='mainMenu-container'>
      <div className='logo-container'>
        <img src={gameLogo} alt='logo-memocardz-game' />
      </div>
      <div className='textWelcome'>Bienvenido {!! player ? player : ''}!</div>
      <form className='form'>
        <input type='text' className='inputName' onChange={handleChange} maxLength='15'/>
        <Link to="game">
          <button className='btnStart' onClick={handleSubmit}>Start</button>
        </Link>

      </form>

      <button className='btnShowtopscores'>Show Top 5 scores</button>

    </div>
  )
}
