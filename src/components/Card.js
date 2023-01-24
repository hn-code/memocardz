import React, { useEffect, useState } from 'react'

export const Card = ({ card, index, cardBack, flippedCard, disableCards, unflipCards }) => {
  const srcCard = card.src;
  const nameCard = card.name;
  const srcCardBack = cardBack;

  const cardComplete = { srcCard, nameCard, index }

  const [isFlipped, setIsFlipped] = useState(false);
  const [canBeClick, setCanBeClick] = useState(true);

  const handleClick = () => {
    const value = flippedCard(cardComplete)
    if (value !== 0) {
      setIsFlipped(true)
    }
  }

  useEffect(() => {
    if (unflipCards.length > 0) {
      if(unflipCards[0].index === index || unflipCards[1].index === index){
        setTimeout(() => {
          setIsFlipped(false)
          setCanBeClick(true)
        }, 1000)
      }
    }
  }, [unflipCards])

  useEffect(() => {
    if(disableCards.length > 0) {
      if(disableCards.some(card => card.index === index)){
        setCanBeClick(false)
        setIsFlipped(true)
      }
    }
  }, [disableCards])

  return (
    <div className="grid-cell"><img src={isFlipped ? srcCard : srcCardBack} alt={nameCard} onClick={canBeClick ? handleClick : ()=>{}} /></div>
  )
}

