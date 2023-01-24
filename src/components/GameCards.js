import React, { useEffect, useState } from 'react'
import './GameCards.css'
import { images } from '../importImgs';
import { Card } from './Card';
import cardBack from '../imgs/backSide.png'
import { Timer } from './Timer';
import { CardLoader } from './CardLoader';
import { useNavigate} from 'react-router-dom';

export const GameCards = ({ timeCD }) => {

  const [endGame, setEndGame] = useState(false);
  const [firstCard, setFirstCard] = useState({});
  const [secondCard, setSecondCard] = useState({});
  const [pairFounded, setPairFounded] = useState(0);
  const [disableCards, setDisableCards] = useState([]);
  const [unflipCards, setUnflipCards] = useState([]);
  const navigation = useNavigate();

  //Desordena el array para darle aleatoriedad a la posicion de las cartas
  useEffect(() => {
    images.sort(() => Math.random() - 0.5)
  }, [])

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

  const checkBoth = () => {
    if (firstCard.nameCard && secondCard.nameCard && firstCard.nameCard === secondCard.nameCard) {
      if (!disableCards.some(card => card.index === firstCard.index) || !disableCards.some(card => card.index === secondCard.index)) {
        setDisableCards([...disableCards, firstCard, secondCard])
        setPairFounded(pairFounded + 1)
      }
      clearFirstSecondCards();
    } else if (firstCard.nameCard && secondCard.nameCard && firstCard.nameCard !== secondCard.nameCard) {
      setUnflipCards([firstCard, secondCard])
      clearFirstSecondCards();
    }
  }

  useEffect(() => {
    checkBoth()
  }, [firstCard, secondCard])

  //Una vez alcanzado el maximo par el juego finaliza
  useEffect(() => {
    if (pairFounded === 8) {
      setEndGame(true);
      console.log("juego terminado");
      console.log("juego terminado");
      console.log("juego terminado");
    }
  }, [pairFounded])

  useEffect(() => {
    if(endGame){
      setEndGame(false)
      navigation('/scores');
    }
       
  }, [endGame])

  return (
    <div className='gameScreen'>
      <Timer endGame={endGame} timeCD={timeCD} />

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


    </div>
  )
}
