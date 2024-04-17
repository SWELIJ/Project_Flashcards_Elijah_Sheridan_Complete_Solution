import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import CardForm from "./CardForm";
import { readCard, readDeck } from "../../utils/api";

  // EditCard.js (similar imports...)
  
  export const EditCard = () => {
    const navigate = useNavigate()
    const { deckId, cardId } = useParams();
    const [card, setCard] = useState({}); // State for card data
    const [error, setError] = useState(undefined)
    const [deck, setDeck] = useState({})
  
   
    // This React hook (`useEffect`) runs once after the component renders
  useEffect(() => {
    // Create an AbortController to manage potential API call cancellation
    const abortController = new AbortController();
    const signal = abortController.signal; // Get the signal object for cancellation
    // Fetch the card using the AbortController's signal for cancellation
    readCard(cardId, signal)
      .then((response) => {
        // Update the state with the fetched card data
        setCard(response);
      })
      .catch((error) => {
        // Handle any errors during the API call
        setError(error);
      });
      readDeck(deckId, signal)
      .then((response) => {
        // Update the state with the fetched card data
        setDeck(response);
      })
      .catch((error) => {
        // Handle any errors during the API call
        setError(error);
      });

    // Cleanup function to be executed when the component unmounts or before re-running the effect
    return () => abortController.abort();
  }, [cardId]);
  
   
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
          <li className="breadcrumb-item active" aria-current="page">Edit Card {card && card.id}</li>
        </ol>
        </span>
      </nav>
        <h1>Edit Card</h1>
        <CardForm initialFormData={card} onSubmit={handleSubmit} deckId={deckId} isAddCard={false} />
      </div>
    );
  };

  export default EditCard