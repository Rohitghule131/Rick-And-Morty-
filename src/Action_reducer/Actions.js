import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const fileterCharacter = createAsyncThunk('get/filtercharacter',async(url)=>{
    const restUrl = `https://rickandmortyapi.com/api/character/?${url}`
    const response = await axios.get(restUrl).catch((err)=>{
        console.log("Fetching error ",err)
        console.log('url',restUrl)
    })
    console.log("Filter Character",response.data)
    return response.data
})