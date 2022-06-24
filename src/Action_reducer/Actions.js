import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { useSelector } from "react-redux"

// filter action which is gives one parameter as argumente concate with rest api 
// and return accessed json format

export const fileterCharacter = createAsyncThunk('get/filtercharacter',async(url)=>{
    const restUrl = `https://rickandmortyapi.com/api/character/?${url}`
    const response = await axios.get(restUrl).catch((err)=>{
        console.log("Fetching error ",err)
        console.log('url',restUrl)
    })
    console.log("Filter Character",response.data)
    return response.data
})

export const removeMyFavcharacter = createAsyncThunk('remove/cahracter', (id)=>{
    console.log("claa",id)
    const favCharacter = useSelector(state=>state.CharacterReducer.favCharacter)
    const index = favCharacter.findIndex(elem=>elem.id===id)
    console.log(favCharacter,index)
    return index
})