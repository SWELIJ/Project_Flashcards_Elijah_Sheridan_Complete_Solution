# Project_Flashcards_Elijah_Sheridan_Complete_Solution

Getting Started
Download or clone this repository.
Open a terminal in the project directory.
Run npm install to install dependencies.
Run npm start to launch the project.


# Components explained

Screen	Path	Description
Home	/	Shows a list of decks with options to create, study, view, or delete a deck

Study	/decks/:deckId/study	Allows the user to study the cards from a specified deck

Create Deck	/decks/new	Allows the user to create a new deck

Deck	/decks/:deckId	Shows all of the information about a specified deck with options to edit or add cards to the deck, navigate to the study screen, or delete the deck

Edit Deck	/decks/:deckId/edit	Allows the user to modify information on an existing deck

Add Card	/decks/:deckId/cards/new	Allows the user to add a new card to an existing deck

Edit Card	/decks/:deckId/cards/:cardId/edit	Allows the user to modify information on an existing card
