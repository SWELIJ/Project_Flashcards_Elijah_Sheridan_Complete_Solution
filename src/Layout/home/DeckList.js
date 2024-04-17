//imports functions/components
import React, { useEffect, useState } from "react";
import "../../App.css";
import { Link } from "react-router-dom";

import { listDecks, deleteDeck, readDeck } from "../../utils/api";
//----end imports

export const DeckList = () => {
  const [decks, setDecks] = useState([]);
  const [error, setError] = useState(undefined);
  

  // This React hook (`useEffect`) runs once after the component renders
  useEffect(() => {
    // Create an AbortController to manage potential API call cancellation
    const abortController = new AbortController();
    const signal = abortController.signal; // Get the signal object for cancellation

    // Fetch the list of decks using the AbortController's signal for cancellation
    listDecks(signal)
      .then((response) => {
        // Update the state with the fetched decks data
        setDecks(response);
      })
      .catch((error) => {
        // Handle any errors during the API call
        setError(error);
      });
    

    
 

    // Cleanup function to be executed when the component unmounts or before re-running the effect
    return () => abortController.abort();
  }, []);
  console.log(decks); //check decks variable

  if (error) {
    return <h2>An error has occurred</h2>;
  }
  // Check if users is an array before mapping

  function deleteEntireDeck(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this Deck?"
    );
    if (confirmed) {
      deleteDeck(id);
      window.location.reload();
    } else {
      return null;
    }
  }

  const list = Array.isArray(decks)
    ? decks.map((deck) => (
        <div key={deck.id} className="border border-dark rounded p-3 ">
     <h3>{deck.name} </h3>{deck.cards.length} cards
          <p>{deck.description}</p>
          <div className="">
          <Link to={`/decks/${deck.id}`} className="btn btn-secondary rounded border-dark shadow p-2 ">View </Link>
          <Link to={`/decks/${deck.id}/study`} className="btn btn-primary rounded border-dark shadow p-2">Study  </Link>
          <button onClick={() => deleteEntireDeck(deck.id)} className="btn btn-danger rounded border-dark shadow ml-auto p-2 float-right">Delete </button>
          </div>
        </div>
      ))
    : null;

  return (
    <div className="container">
      <Link to={`/decks/new`} className="btn btn-primary rounded-pill border-dark shadow p-2 w-25">
        Create Deck
      </Link>
      <br/>
      <br/>
      {list}
    </div>
  );
};

export default DeckList;
