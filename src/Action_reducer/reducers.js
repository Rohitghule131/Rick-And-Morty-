import {createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { fileterCharacter, getCharacter } from "./Actions"

const initialState = {
    characters:[],
    favCharacter:[],
    favCharacterId:[],
    numberOfFav:0,
    prevFavcharacter:'Rick Sanchez',
    currentFavcharacter:'',
    loading:true,
    loaded:false,
    loadError:false,
}

// export const getCharacter = createAsyncThunk('get/character', async()=>{
//     const response = await axios.get('https://rickandmortyapi.com/api/character').catch((err)=>{
//         console.log("Error :- ",err)
//     })
//     console.log(response.data)
//     return response.data
// })

const characterSlice = createSlice({
    name : 'chacter',
    initialState,
    reducers:{
        removeMyfavourite:(state,id)=>{
            if(state.characters.results.find(elem=>elem.id===id.payload)){
                let index = state.favCharacter.findIndex(elem=>elem.id===id.payload)
                let indexChar = state.characters.results.findIndex(elem=>elem.id===id.payload)
                state.characters.results[indexChar].icon = false
                state.favCharacter.splice(index,1)
                state.numberOfFav -= 1
            }else{
                let index = state.favCharacter.findIndex(elem=>elem.id===id.payload)
                state.favCharacter.splice(index,1)
                state.numberOfFav -= 1
            }

        },
        addFavourite:(state,id)=>{
            if(state.favCharacter.find(elem=>elem.id===id.payload)){
                let index = state.favCharacter.findIndex(elem=>elem.id===id.payload)
                let indexChar = state.characters.results.findIndex(elem=>elem.id===id.payload)
                state.characters.results[indexChar].icon = false
                state.favCharacter.splice(index,1)
                state.numberOfFav -= 1
            }
            else{
                let element = state.characters.results.filter(elem=>elem.id===id.payload)

                element[0].icon = true
                state.favCharacter.push(element[0])
                state.numberOfFav += 1
            }
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(getCharacter.fulfilled,(state,action)=>{
            state.characters = action.payload
            state.characters.results.map(elem=>elem['icon']=false)
            state.loaded = true
            state.favCharacter.map(elem=>{
                if(state.characters.results.find(innerElem=>innerElem.id===elem.id)){
                    const getVal = state.characters.results.filter(innerElem=>innerElem.id===elem.id)
                    getVal[0].icon = true
                }
            })
        })
        builder.addCase(getCharacter.pending,(state)=>{
            state.loading = true
        })
        builder.addCase(getCharacter.rejected,(state)=>{
            state.loadError = true
        })
        builder.addCase(fileterCharacter.fulfilled,(state,action)=>{
            state.characters = action.payload
            state.loadError = false
            state.loaded = true
            state.characters.results.map(elem=>elem['icon']=false)
            state.loaded = true
            state.favCharacter.map(elem=>{
                if(state.characters.results.find(innerElem=>innerElem.id===elem.id)){
                    const getVal = state.characters.results.filter(innerElem=>innerElem.id===elem.id)
                    getVal[0].icon = true
                }
            })
        })
        builder.addCase(fileterCharacter.rejected,(state,action)=>{
            state.loadError = true
        })
    }
})

export const {removeMyfavourite,addFavourite} = characterSlice.actions
export default characterSlice.reducer;