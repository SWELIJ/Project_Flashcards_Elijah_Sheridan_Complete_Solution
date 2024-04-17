import React, { useState, useEffect } from "react";
import {  useNavigate, Link } from "react-router-dom";
import DeckForm from "./DeckForm";
import { listDecks } from "../../utils/api";

export const CreateDeck = () => {
  const navigate = useNavigate();
  const [decks, setDecks] = useState(null);
  const [error, setError] = useState(undefined);

  const handleSubmit = () => {
  
    ///submit
  };
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

  

  return (
    <div>
      <nav aria-label="breadcrumb">
        <span>
          <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to={`/`}>Home</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Create Deck</li>
        </ol>
        </span>
      </nav>
      <h1>Create Deck</h1>
      <DeckForm onSubmit={handleSubmit} isCreateDeck={true} />
    </div>
  );
};

export default CreateDeck;
