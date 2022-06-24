import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { fileterCharacter, removeMyFavcharacter } from "./Actions"

const initialState = {
    characters:[],
    favCharacter:[],
    favCharacterId:[],
    numberOfFav:0,
    prevFavcharacter:'',
    currentFavcharacter:'',
    loading:true,
    loaded:false,
    loadError:false,
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
        removeMyfavourite:(state,id)=>{
            console.log("im in remove")
            console.log(state.favCharacter)
            // const index = state.favCharacter.findIndex(elem=>elem.id===id)
            // state.favCharacter(index,1)
        }
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
            if(state.favCharacter.find(elem=>elem.id===action.payload.id)){
                const index = state.favCharacter.findIndex(elem=>elem.id===action.payload.id)
                const idSplice = state.favCharacterId.findIndex(elem=>elem===action.payload.name)
                state.favCharacterId.splice(idSplice,1)
                state.favCharacter.splice(index,1)
                state.numberOfFav -= 1
                state.currentFavcharacter=action.payload.name
                console.log(index,idSplice)

            }
            else{
                state.favCharacter.push(action.payload)
                state.favCharacterId.push(`${action.payload.name}`)
                state.loaded = true
                state.numberOfFav += 1
            }
        })
        builder.addCase(favouriteCharacter.rejected,(state)=>{
            state.loadError = true
            state.loaded = false
        })
        builder.addCase(fileterCharacter.fulfilled,(state,action)=>{
            state.characters = action.payload
            state.loadError = false
            state.loaded = true
        })
        builder.addCase(fileterCharacter.rejected,(state,action)=>{
            state.loadError = true
        })
        builder.addCase(removeMyFavcharacter, (state,action)=>{
            console.log("in remove character ",action)
        })
    }
})

export const {removeMyfavourite} = characterSlice.actions
export default characterSlice.reducer;