import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fileterCharacter } from '../Action_reducer/Actions'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export var characterCount;
export var pages;

function PaginationOfPages() {
    const dispatch = useDispatch()
    const pageinfo = useSelector(state=>state.CharacterReducer.characters.info)
    const loaded = useSelector(state=>state.CharacterReducer.loaded)
    if(loaded){
        pages = pageinfo.pages
        characterCount = pageinfo.count
    }
  return (
    <>
        <Stack spacing={2}>
      <Pagination count={pages} color="secondary" onChange={(e,page)=>{
        dispatch(fileterCharacter(`page=${page}`))
      }}/>
    </Stack>
    </>
  )
}

export default PaginationOfPages;
