import React,{useEffect} from 'react'
import Navbar from './component/Navbar'
import FavouriteScreen from './component/FavouriteScreen'
import CharactersScreen from './component/CharactersScreen'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getCharacter } from './Action_reducer/Actions'
function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getCharacter())
  }, [])
  
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/Rick-And-Morty-' element={<CharactersScreen />} />
          <Route path='/fav' element={<FavouriteScreen />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App