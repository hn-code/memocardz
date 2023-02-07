import React, { createContext, useEffect, useState } from 'react'

export const playerContext = createContext();

export const PlayerProvider = ({ children }) => {

  const [playerData, setPlayerData] = useState(null);
  const [playerName, setPlayerName] = useState(null);
  const [playerScore, setPlayerScore] = useState(null);
  const [playerMoves, setPlayerMoves] = useState(0);

  const saveName = (name) => {
    localStorage.setItem("playerName", name);
    setPlayerName(localStorage.getItem("playerName"));
  }

  const saveScore = (score) => {
    setPlayerScore(score);
  }

  const saveMoves = (moves) => {
    setPlayerMoves(moves)
  }

  useEffect(() => {
    if (playerName && playerScore && playerMoves) {
      setPlayerData(
        {
          name: playerName,
          score: playerScore,
          moves: playerMoves
        }
      )
    }
  }, [playerName, playerScore, playerMoves])

  return (
    <playerContext.Provider value={{ saveName, saveScore, saveMoves, setPlayerData, playerName, playerScore, playerData }}>
      {children}
    </playerContext.Provider>
  )
}
