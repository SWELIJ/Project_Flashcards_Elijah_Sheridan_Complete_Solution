


import  { useParams, useNavigate, Link } from "react-router-dom";
import { readDeck } from "../../utils/api";
import React, { useState, useEffect } from "react";

export const StudyCard = () => {
  const { deckId } = useParams();
  const navigate = useNavigate();
  const [deck, setDeck] = useState([]);
  const [error, setError] = useState(undefined);

  // This React hook (`useEffect`) runs once after the component renders
  useEffect(() => {
    // Create an AbortController to manage potential API call cancellation
    const abortController = new AbortController();
    const signal = abortController.signal; // Get the signal object for cancellation

    // Fetch the deck using the AbortController's signal for cancellation
    readDeck(deckId, signal)
      .then((response) => {
        // Update the state with the fetched deck data
        setDeck(response);
      })
      .catch((error) => {
        // Handle any errors during the API call
        setError(error);
      });

    // Cleanup function to be executed when the component unmounts or before re-running the effect
    return () => abortController.abort();
  }, []);

  const { cards } = deck; //deconstruct cards object from the deck

  //flip card function + next
  const [flippedState, setFlippedState] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [finishedDeck, setFinishedDeck] = useState(false);

  function flipButton() {
    // flip button
    const handleClick = () => {
      setFlippedState(!flippedState);
    };
    return <button 
    onClick={handleClick}
    className="btn btn-secondary rounded border-dark shadow p-2 m-2">
      Flip
      </button>;
  }

  function restartMsg() {
    const confirmed = window.confirm("Restart Deck");
    if (confirmed) {
      setCurrentIndex(0);
      setFlippedState(false);
    } else {
      navigate(`/`);
    }
  }

  function nextButton(cards) {
    // create next button
    const handleClick = () => {
      if (currentIndex < cards.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setFlippedState(false);
      } else if (currentIndex + 1 === cards.length) { // if clicked when user is on last card
        restartMsg();
      }
    };
    return <button 
    onClick={handleClick}
    className="btn btn-primary rounded border-dark shadow p-2 m-2">
      Next
      </button>;
  }

  function studySide() {
    //function displays front of card with the flip and next button
    if (cards.length <= 2) { // if deck has less than 3 cards
      return (
        <div>
          <h4>
            Not enough cards. Please be sure this deck has 3 or more cards by
            adding more.
          </h4>
          <br/>
          <Link to={`/decks/${deckId}/cards/new`}>Add Cards</Link>
        </div>
      );
    } else {
      if (flippedState === true) {
        //console.log(currentIndex)
        return (
          <div>
          <h3>
            Card {cards && currentIndex + 1} of {cards && cards.length}
          </h3>
            <p className="rounded p-3 shadow m-3">{cards[currentIndex].back}</p>
            {flipButton()}
            {nextButton(cards)}
          </div>
        );
      } else if (flippedState === false) {
        //console.log(currentIndex)
        return (
          <div><h3>
          Card {cards && currentIndex + 1} of {cards && cards.length}
        </h3>
            <p className="rounded p-3 shadow m-3" >{cards[currentIndex].front} </p>
            {flipButton()}
          </div>
        );
      }
    }
  }
  return (
    <div>
      <nav aria-label="breadcrumb">
        <span>
          <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to={`/`}>Home</Link></li>
          <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deck && deck.name}</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Study</li>
        </ol>
        </span>
      </nav>
      <div>
        <section>
          
          {cards && studySide()}
        </section>
      </div>
    </div>
  );
};

export default StudyCard;
