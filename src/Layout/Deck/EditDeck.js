import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import DeckForm from "./DeckForm";
import { readDeck } from "../../utils/api";

  
  
  export const EditDeck = () => {
    const navigate = useNavigate()
    const { deckId} = useParams();
    const [deck, setDeck] = useState({}); // State for deck data
    const [error, setError] = useState(undefined)
  
  
   
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
  }, [deckId]);
  
   
    const handleSubmit = () => {
      navigate(`/decks/${deckId}`); // Navigate back to deck details
    };

  
    return (
      <div>
        <nav aria-label="breadcrumb">
        <span>
          <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to={`/`}>Home</Link></li>
          <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deck && deck.name}</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Edit Deck</li>
        </ol>
        </span>
      </nav>
        <h1>Edit Deck</h1>
        <DeckForm initialFormData={deck} onSubmit={handleSubmit} deckId={deckId} isCreateDeck={false} />
      </div>
    );
  };

  export default EditDeck