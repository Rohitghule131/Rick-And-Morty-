import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch } from 'react-redux';
import { fileterCharacter } from '../Action_reducer/Actions';

export default function SearchButton() {
    const [name,setName] = useState('')
    const dispatch = useDispatch()
    const nameHandler = ()=>{
        console.log('searched name',name)
        dispatch(fileterCharacter(`name=${name}`))
    }
  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
      style={{'margin':'3px'}}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        value={name}
        onChange={(e)=>setName(e.target.value)}
        placeholder="Search Character Name"
        inputProps={{ 'aria-label': 'search google maps' }}
      />
      <IconButton onClick={()=>{
        nameHandler()
        console.log("searched")
      }} sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
