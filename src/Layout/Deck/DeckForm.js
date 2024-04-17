import React, { useState, useEffect } from "react";
import { createDeck, updateDeck } from "../../utils/api"; // import api function
import { useParams, useNavigate } from "react-router-dom";

export const DeckForm = ({
  initialFormData = {},
  onSubmit,
  id,
  isCreateDeck,
}) => {
  const {deckId} = useParams()
  const [formData, setFormData] = useState(initialFormData);
  const navigate = useNavigate();




  
  useEffect(() => {
    setFormData(initialFormData); // Populate form with initial data for UpdateDeck
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
        // Edit deck if id exists
        await updateDeck(formData);
      } else {
        // Create new deck if no id
        const newDeck = await createDeck(formData);
        navigate(`/decks/${newDeck.id}`)
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
      <label className="form-check-label">Name</label>
        <br />
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Deck Name"
          className="form-control shadow"
          required={true}
        />
        <br />
        <label className="form-check-label">Description</label>
        <br></br>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Brief Description of the Deck"
          className="form-control shadow"
          required={true}
        />
        <br/>
        
        <div className="button-container">
          {isCreateDeck ? (
            <div>
              <button
                type="button" 
                className="btn btn-primary rounded border-dark shadow p-2"
                onClick={(event) => {
                  handleSubmit(event);
                  
                }}
              >
                Submit
              </button>
              <button
                type="button"
                className="btn btn-secondary rounded border-dark shadow p-2 "
                onClick={() => navigate(`/`)}
              >
                Cancel
              </button>
            </div>
          ) : (
            <div>
              <button type="submit" className="btn btn-primary rounded border-dark shadow p-2">Submit</button>
              <button
                type="button"
                className="btn btn-secondary rounded border-dark shadow p-2"
                onClick={() => navigate(`/decks/${formData.id}`)}
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

export default DeckForm;
