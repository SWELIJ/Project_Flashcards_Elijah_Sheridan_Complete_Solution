import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import CardForm from "./CardForm";
import { readDeck } from "../../utils/api";

export const AddCard = () => {
  const {deckId} = useParams()
  const navigate = useNavigate()
  const [deck, setDeck] = useState(null)
  const [error, setError] = useState(undefined)
  

  const handleSubmit = () => { ///submit
    window.location.reload()
    }
 
    

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

 

  return (
    <div>
      <nav aria-label="breadcrumb">
        <span>
          <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to={`/`}>Home</Link></li>
          <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deck && deck.name}</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Add Card</li>
        </ol>
        </span>
      </nav>
      <h2>{deck && deck.name}: Add Card</h2>
      <CardForm onSubmit={handleSubmit} deckId={deckId} isAddCard={true} />
    </div>
  );
};

export default AddCard;
