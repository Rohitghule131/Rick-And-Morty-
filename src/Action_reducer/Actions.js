import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

// filter action which is gives one parameter as argumente concate with rest api 
// and return accessed json format

export const fileterCharacter = createAsyncThunk('get/filtercharacter',async(url)=>{
    const restUrl = `https://rickandmortyapi.com/api/character/?${url}`
    const response = await axios.get(restUrl).catch((err)=>{
        console.log("Fetching error ",err)
    })
    return response.data
})

export const getCharacter = createAsyncThunk('get/character', async()=>{
    const response = await axios.get('https://rickandmortyapi.com/api/character').catch((err)=>{
        console.log("Error :- ",err)
    })
    return response.data
})