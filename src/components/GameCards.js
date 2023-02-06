import React, { useContext, useEffect, useState } from 'react'
import './GameCards.css'
import { images } from '../importImgs';
import { Card } from './Card';
import cardBack from '../imgs/backSide.png'
import { Timer } from './Timer';
import { CardLoader } from './CardLoader';
import { useNavigate } from 'react-router-dom';
import { playerContext } from '../providers/PlayerProvider';
import { ModalEnd } from './ModalEnd';

export const GameCards = ({ timeCD }) => {

  const [endGame, setEndGame] = useState(false);
  const [firstCard, setFirstCard] = useState({});
  const [secondCard, setSecondCard] = useState({});
  const [pairFounded, setPairFounded] = useState(0);
  const [disableCards, setDisableCards] = useState([]);
  const [unflipCards, setUnflipCards] = useState([]);
  const [timeInGame, setTimeInGame] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [moves, setMoves] = useState(0);

  const { playerData, saveMoves } = useContext(playerContext)

  const navigation = useNavigate();

  //Desordena el array para darle aleatoriedad a la posicion de las cartas
  // useEffect(() => {
  //   images.sort(() => Math.random() - 0.5)
  // }, [])

  //Setea las cartas que se le pasen
  const flippedCard = (card) => {
    if (!firstCard.nameCard) {
      setFirstCard(card)
      return 1;
    } else if (card.index === firstCard.index) {
      return 0;
    } else if (!secondCard.nameCard) {
      setSecondCard(card);
      return 2;
    }
  }

  //Limpia los estados para evaluar otras dos cartas
  const clearFirstSecondCards = () => {
    setFirstCard({})
    setSecondCard({});
  }

  const handleTime = (time) => {
    setTimeInGame(time)
  }

  //Se chequean ambas cards
  const checkBoth = () => {
    if (firstCard.nameCard && secondCard.nameCard && firstCard.nameCard === secondCard.nameCard) {
      if (!disableCards.some(card => card.index === firstCard.index) || !disableCards.some(card => card.index === secondCard.index)) {
        setDisableCards([...disableCards, firstCard, secondCard])
        setPairFounded(pairFounded + 1)
        setMoves(moves + 1);
      }
      clearFirstSecondCards();
    } else if (firstCard.nameCard && secondCard.nameCard && firstCard.nameCard !== secondCard.nameCard) {
      setUnflipCards([firstCard, secondCard])
      clearFirstSecondCards();
      setMoves(moves + 1);
    }
  }

  //Detecta que se han seleccionado las cards y ejecuta la funcion de chequeo
  useEffect(() => {
    checkBoth()
  }, [firstCard, secondCard])

  //Una vez alcanzado el maximo par el juego finaliza
  useEffect(() => {
    if (pairFounded === 8) {
      setEndGame(true);
    }
  }, [pairFounded])

  useEffect(() => {
    if (endGame) {
      setEndGame(true);
      saveMoves(moves)
      if (playerData && playerData.name && playerData.score) {
        setShowModal(true)
        setTimeout(() => {
          setShowModal(false);
          navigation('/');
        }, 5000);
      }
    }
  }, [endGame, playerData])

  return (
    <div className='gameScreen'>
      <Timer endGame={endGame} timeCD={timeCD} handleTime={handleTime} />

      {
        timeCD === 0
          ? <div className="grid-container">
            {
              images.map((card, index) => (
                <Card
                  key={index}
                  index={index}
                  card={card}
                  cardBack={cardBack}
                  flippedCard={flippedCard}
                  unflipCards={unflipCards}
                  disableCards={disableCards}
                />
              ))
            }
          </div>
          : <CardLoader />
      }
      {
        showModal && <ModalEnd name={playerData.name} scoreTime={playerData.score} moves={moves} />
      }
    </div>
  )
}
