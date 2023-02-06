import React, { useEffect, useState } from 'react';
import './Card.css'

export const Card = ({ card, index, cardBack, flippedCard, disableCards, unflipCards }) => {
  const srcCard = card.src;
  const nameCard = card.name;
  const srcCardBack = cardBack;

  const cardComplete = { srcCard, nameCard, index }

  const [isFlipped, setIsFlipped] = useState(false);
  const [canBeClick, setCanBeClick] = useState(true);
  const [clickedCard, setClickedCard] = useState(false);

  const handleClick = (e) => {
    const value = flippedCard(cardComplete)
    if (value !== 0) {
      setIsFlipped(true)
      setClickedCard(true)
    } 
  }

  useEffect(() => {
    if (unflipCards.length > 0) {
      if(unflipCards[0].index === index || unflipCards[1].index === index){
        setTimeout(() => {
          setIsFlipped(false)
          setCanBeClick(true)
          setClickedCard(false)
        }, 1000)
      }
    }
  }, [unflipCards])

  useEffect(() => {
    if(disableCards.length > 0) {
      if(disableCards.some(card => card.index === index)){
        setCanBeClick(false)
        setIsFlipped(true)
        setClickedCard(true)
      }
    }
  }, [disableCards])

  return (
    <div className="grid-cell"><img className={clickedCard ? 'img' : ''} src={isFlipped ? srcCard : srcCardBack} alt={nameCard? nameCard : 'card'} onClick={canBeClick ? handleClick : ()=>{}} /></div>
  )
}

