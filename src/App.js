import React from 'react'
import Navbar from './component/Navbar'
import FavouriteScreen from './component/FavouriteScreen'
import CharactersScreen from './component/CharactersScreen'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<CharactersScreen />} />
          <Route path='/fav' element={<FavouriteScreen />} />
        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App