import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fileterCharacter } from '../Action_reducer/Actions'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { filterPara } from './CharactersScreen';
import { searchedName } from './SearchButton';

var pages = 1
var characterCount = 1

function PaginationOfPages() {
    const dispatch = useDispatch()
    const pageinfo = useSelector(state=>state.CharacterReducer.characters.info)
    const loaded = useSelector(state=>state.CharacterReducer.loaded)
    if(loaded){
        pages = pageinfo.pages
        characterCount = pageinfo.count
    }
    const disptchfilterParameter = (pagee)=>{
      const {gender,status,species} = filterPara
      const searchPara = `${gender}&${status}&${species}&${searchedName}&page=${pagee}`
      dispatch(fileterCharacter(searchPara))
    }
  return (
    <>
        <Stack spacing={2}>
      <Pagination count={pages} color="secondary" onChange={(e,page)=>{
        disptchfilterParameter(page)
      }}/>
    </Stack>
    </>
  )
}

export default PaginationOfPages;
