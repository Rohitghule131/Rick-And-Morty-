import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { fileterCharacter } from "./Actions"

const initialState = {
    characters:[],
    favCharacter:[],
    numberOfFav:0,
    loading:true,
    loaded:false,
    loadError:false
}

export const favouriteCharacter = createAsyncThunk('get/favCharacter', async(characterAPI)=>{
    const response = await axios.get(`${characterAPI}`).catch((err)=>{
        console.log("Favourite character error : ",err)
    })
    console.log(response.data)
    return response.data
})

export const getCharacter = createAsyncThunk('get/character', async()=>{
    const response = await axios.get('https://rickandmortyapi.com/api/character').catch((err)=>{
        console.log("Error :- ",err)
    })
    console.log(response.data)
    return response.data
})

const characterSlice = createSlice({
    name : 'chacter',
    initialState,
    reducers:{
        //
    },
    extraReducers:(builder)=>{
        builder.addCase(getCharacter.fulfilled,(state,action)=>{
            state.characters = action.payload
            state.loaded = true
        })
        builder.addCase(getCharacter.pending,(state)=>{
            state.loading = true
        })
        builder.addCase(getCharacter.rejected,(state)=>{
            state.loadError = true
        })
        builder.addCase(favouriteCharacter.pending,(state)=>{
            state.loading = true
        })
        builder.addCase(favouriteCharacter.fulfilled,(state,action)=>{
            state.favCharacter.push(action.payload)
            state.loaded = true
            state.numberOfFav += 1
        })
        builder.addCase(favouriteCharacter.rejected,(state)=>{
            state.loadError = true
        })
        builder.addCase(fileterCharacter.fulfilled,(state,action)=>{
            state.characters = action.payload
        })
        builder.addCase(fileterCharacter.rejected,(state,action)=>{
            state.loadError = true
        })
    }
})

export default characterSlice.reducer;