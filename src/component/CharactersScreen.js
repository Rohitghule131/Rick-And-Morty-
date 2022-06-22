import React, { useState } from 'react'
import Charactercards from './Character.cards'
import "./Character.card.css"
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { fileterCharacter } from '../Action_reducer/Actions';
import { useDispatch } from 'react-redux';
// 'species=Human&status=alive'
import SearchButton from './SearchButton';
import { Grid, } from '@mui/material';
import PaginationOfPages from './Pagination';

function CharactersScreen() {
  // const [filtertype,setFilterType] = useState('')
  const [gender, setGender] = useState('')
  const [status, setStatus] = useState('')
  const [species, setSpecies] = useState('')
  
  const disptch = useDispatch()
  if(gender || status || species ){
    console.log(gender)
    disptch(fileterCharacter(`${gender}&${status}&${species}`))
  }

  const styleBox = {
    'width':'100%',
    'display':'inline-flex',
    'justify-content':'center',
    // 'border':'1px solid',
    'padding':'10px',
  }
  const styleBoxInput = {
    'width':'20%',
    'margin':'3px'
  }
  return (
    <div className='cards_container'>
      <h6 id='fillterHeader'>Filter Your Favourite Character Here</h6>
      <div id='filters'>
      <Box style={styleBox}>
      <FormControl style={styleBoxInput} fullWidth>
          <InputLabel id="demo-simple-select-label">Species</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Status"
            value={species}
            onChange={e=>{
              setSpecies(e.target.value)
              
            }}
          >
            <MenuItem value={'species=human'}>Human</MenuItem>
            <MenuItem value={'species=alien'}>Alien</MenuItem>
            <MenuItem value={'species=unknown'}>Unknown</MenuItem>
          </Select>
        </FormControl>
        <FormControl style={styleBoxInput} fullWidth>
          <InputLabel id="demo-simple-select-label">Gender</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Status"
            value={gender}
            onChange={e=>{
              setGender(e.target.value)
              
            }}
          >
            <MenuItem value={'gender=male'}>Male</MenuItem>
            <MenuItem value={'gender=female'}>Female</MenuItem>
            <MenuItem value={'gender=unknown'}>Unknown</MenuItem>
          </Select>
        </FormControl>
        <FormControl style={styleBoxInput} fullWidth>
          <InputLabel id="demo-simple-select-label">Status</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Status"
            value={status}
            onChange={e=>{
              setStatus(e.target.value)
              
            }}
          >
            <MenuItem value={'status=alive'}>Alive</MenuItem>
            <MenuItem value={'status=dead'}>Dead</MenuItem>
            <MenuItem value={'status=unknown'}>Unknown</MenuItem>
          </Select>
        </FormControl>
        <SearchButton/>
      </Box>
      
      </div>
      <div className='grid_container'>
        <Charactercards />
      </div>
        <div id='pagination'>
          <PaginationOfPages/>
        </div>
    </div>

  )
}
export default CharactersScreen;