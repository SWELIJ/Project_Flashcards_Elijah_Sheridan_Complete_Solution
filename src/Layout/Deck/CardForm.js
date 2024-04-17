import React, { useState, useEffect } from "react";
import { createCard, updateCard } from "../../utils/api"; // Assuming updateCard function
import { useParams, useNavigate } from "react-router-dom";

export const CardForm = ({
  initialFormData = {},
  onSubmit,
  deckId,
  isAddCard,
}) => {
  const [formData, setFormData] = useState(initialFormData);
  const navigate = useNavigate();
  async function returnToDeck() {
    navigate(`/decks/${deckId}`);
  }
  //const {deckId} = useParams()
  useEffect(() => {
    setFormData(initialFormData); // Populate form with initial data for EditCard
  }, [initialFormData.id]); //run once depending on initialFormData.id

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (formData.id) {
        // Edit card if id exists
        await updateCard(formData);
      } else {
        // Create new card if no id
        await createCard(deckId, formData);
      }
      onSubmit();
    } catch (error) {
      console.error(error); // Handle errors appropriately
    }
  };

  return (
    <div>
      <form name="create" onSubmit={handleSubmit}>
        <div className="form-group">
        <label className="form-check-label">Front</label>
        <br />
        <textarea
          id="front"
          name="front"
          value={formData.front}
          onChange={handleChange}
          placeholder="front of card"
          className="form-control shadow"

          required={true}
        />
        <br />
        <label className="form-check-label">Back</label>
        <br />
        <textarea
          id="back"
          name="back"
          value={formData.back}
          onChange={handleChange}
          placeholder="back of card"
          className="form-control shadow"
          required={true}
        />
        <br />
        <div className="button-container">
          {isAddCard ? (
            <div>
              <button type="submit" className="btn btn-primary rounded border-dark shadow p-2">Save</button>
              <button
                type="button"
                className="btn btn-secondary rounded border-dark shadow p-2"
                onClick={(event) => {
                  handleSubmit(event);
                  navigate(`/decks/${deckId}`);
                }}
              >
                Done
              </button>
            </div>
          ) : (
            <div>
              <button type="submit" className="btn btn-primary rounded border-dark shadow p-2">Submit</button>
              <button
                type="button"
                className="btn btn-secondary rounded border-dark shadow p-2"
                onClick={() => navigate(`/decks/${deckId}`)}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
        </div>
      </form>
    </div>
  );
};

export default CardForm;
