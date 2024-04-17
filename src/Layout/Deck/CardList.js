import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { readDeck, deleteCard, deleteDeck } from "../../utils/api";

export const CardList = () => {
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
  //function to create list of cards
  const list = Array.isArray(cards)
    ? cards.map((card) => (
        <div key={card.id} className="rounded p-3 shadow m-3 ">
          
          <p className="border border-top p-3">Front:<br/> <span>{card.front}</span> </p>
        <p className="border border-top p-3">Back: <br/><span>{card.back}</span> </p>
          <Link
            to={`/decks/${deck.id}/cards/${card.id}/edit`}
            className="btn btn-secondary rounded border-dark shadow p-2 m-2"
          >
            edit
          </Link>
          <button
            onClick={() => deleteThisCard(card.id)}
            className="btn btn-danger rounded border-dark shadow p-2 m-2"
          >
            Delete
          </button>
        </div>
      ))
    : null;

  function deleteEntireDeck(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this Deck?"
    );
    if (confirmed) {
      deleteDeck(id);
      navigate(`/`);
    } else {
      return null;
    }
  }

  function deleteThisCard(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this card?"
    );
    if (confirmed) {
      deleteCard(id);
      window.location.reload();
    } else {
      return null;
    }
  }
  return (
    <div>
      <nav aria-label="breadcrumb">
        <span>
          <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to={`/`}>Home</Link></li>
          <li className="breadcrumb-item active" aria-current="page">{deck && deck.name}</li>
        </ol>
        </span>
      </nav>

      <div className="p-3">
        <h1>{deck.name}</h1> 
        <p>{deck.description}</p>
        <Link to={`/decks/${deckId}/edit`} className="btn btn-secondary rounded border-dark shadow p-2 m-2 ">Edit</Link>
        <Link to={`/decks/${deckId}/study`} className="btn btn-primary rounded border-dark shadow p-2 m-2 ">Study</Link>
        <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary rounded border-dark shadow p-2 m-2">Add Cards</Link>
        <button onClick={() => deleteEntireDeck(deck.id)} className="btn btn-danger rounded border-dark shadow p-2 m-2">Delete </button>
      </div>
      <br />
      <div className="rounded p-3 ">
        <h2>{deck && `Cards`}</h2>
        { deck && list}
      </div>
    </div>
  );
};

export default CardList;
