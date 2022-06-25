import { useState } from 'react'
import * as React from 'react'
import Charactercards from './Character.cards'
import "./Character.card.css"
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { fileterCharacter } from '../Action_reducer/Actions';
import { useDispatch, useSelector } from 'react-redux';
import SearchButton from './SearchButton';
import PaginationOfPages from './Pagination';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Button } from '@mui/material';
import { getCharacter } from '../Action_reducer/Actions';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export var filterPara = {
  gender: '',
  status: '',
  species: ''
}

function CharactersScreen() {
  const [open, setOpen] = useState(false);
  const [gender, setGender] = useState('')
  const [status, setStatus] = useState('')
  const [species, setSpecies] = useState('')
  const loadError = useSelector(state => state.CharacterReducer.loadError)
  const disptch = useDispatch()
  const resetHandler = ()=>{
    disptch(getCharacter())
    setGender('')
    setSpecies('')
    setStatus('')
  }
  const handleClick = () => {
    setOpen(true);
    setTimeout(() => { setOpen(false) }, 2000)
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  if (gender || status || species) {
    filterPara.gender = gender
    filterPara.status = status
    filterPara.species = species
    disptch(fileterCharacter(`${gender}&${status}&${species}`))
  }

  const styleBox = {
    'width': '100%',
    'display': 'inline-flex',
    'justify-content': 'center',
    // 'padding': '10px',
  }
  const styleBoxInput = {
    'width': '20%',
    'margin': '3px'
  }
  return (
    <div className='cards_container'>
      <h6 id='fillterHeader'>Filter Your Favourite Character Here</h6>
      <div id='filterContainer'>
      <div id='filters'>
        <div id='innerFilter'>
        <Box style={styleBox}>
          <FormControl style={styleBoxInput} fullWidth>
            <InputLabel id="demo-simple-select-label">Species</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Status"
              value={species}
              onChange={e => {
                setSpecies(e.target.value)
                handleClick()
              }}
            >
              <MenuItem value={'species=alien'}>Alien</MenuItem>
              <MenuItem value={'species=animal'}>Animal</MenuItem>
              <MenuItem value={'species=human'}>Human</MenuItem>
              <MenuItem value={'species=humanoid'}>Humanoid</MenuItem>
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
              onChange={e => {
                setGender(e.target.value)
                handleClick()
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
              onChange={e => {
                setStatus(e.target.value)
                handleClick()
              }}
            >
              <MenuItem value={'status=alive'}>Alive</MenuItem>
              <MenuItem value={'status=dead'}>Dead</MenuItem>
              <MenuItem value={'status=unknown'}>Unknown</MenuItem>
            </Select>
          </FormControl>
          <SearchButton />
        </Box>
        <div id='resetButton' >
        <Button color="secondary" onClick={()=>{
          resetHandler()
        }}>RESET</Button>
        </div>
        </div>
      </div>
      </div>
      <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          {loadError ? <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            Somthing Went Wrong!
          </Alert> : <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Yeah You FilterOut Characters!
          </Alert>}
        </Snackbar>
      </Stack>
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