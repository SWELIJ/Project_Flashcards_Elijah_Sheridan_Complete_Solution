import React from 'react'           
import NotFound from "./NotFound" // import components for routes
import DeckList from "./home/DeckList"
import CreateDeck from "./Deck/CreateDeck"
import CardList from "./Deck/CardList"
import StudyCard from "./Deck/StudyCard"
import EditDeck from "./Deck/EditDeck"
import AddCard from "./Deck/AddCard"
import EditCard from "./Deck/EditCard"
import { DeckForm } from './Deck/DeckForm'

import { //import Route objects
  Routes, 
  Route,
  } from "react-router-dom"

  function RootRoutes() {


    return (
        <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<DeckList />}/>
            <Route path="/decks/new" element={<CreateDeck />}/>
            <Route path="/decks/:deckId" element={<CardList />}/>
            <Route path="/decks/:deckId/study" element={<StudyCard />}/>
            <Route path="/decks/:deckId/edit" element={<EditDeck />}/>
            <Route path="/decks/:deckId/cards/new" element={<AddCard />}/>
            <Route path="/decks/:deckId/cards/:cardId/edit" element={<EditCard />}/>
        </Routes>
    )

  }


  export default RootRoutes
