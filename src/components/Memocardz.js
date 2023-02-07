import React, { useContext, useEffect, useState } from 'react';
import './Memocardz.css';
import { Link } from 'react-router-dom'
import gameLogo from '../imgs/memocardz-logo.png'
import { playerContext } from '../providers/PlayerProvider';

export const Memocardz = () => {

  const [player, setPlayer] = useState('')
  const [inputName, setInputName] = useState(true)

  const { saveName, setPlayerData, saveScore, saveMoves } = useContext(playerContext);

  const handleChange = (e) => {
    const name = e.target.value;
    if (name.length > 10) {
      setInputName(false)
    } else {
      setInputName(true)
    }
    setPlayer(name)
  }

  const handleSubmit = (e) => {
    if (player.trim() === '' || player.length > 10) {
      e.preventDefault();
    } else {
      saveName(player);
    }
  }

  useEffect(() => {
    setPlayerData({
      name: null,
      score: null,
      moves: null
    });
    saveName(null)
    saveScore(null)
    saveMoves(null)
  }, []);

  return (
    <div className='mainMenu-container'>
      <div className='logo-container'>
        <img src={gameLogo} alt='logo-memocardz-game' />
      </div>
      <div className='textWelcome'>Bienvenido {!!player ? player : ''}!</div>
      <form className='form'>
        {!inputName && <span className='textError'>Nombre demasiado largo! (max. 10)</span>}
        <input type='text' className={inputName ? 'inputName' : 'inputNameError'} onChange={handleChange} maxLength='15' />
        <Link to="game">
          <button className='btnStart' onClick={handleSubmit}>Start</button>
        </Link>
      </form>
    </div>
  )
}
