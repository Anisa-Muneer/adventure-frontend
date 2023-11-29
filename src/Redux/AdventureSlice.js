import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    adventureInfo : {}
}

const adventureSlice = createSlice({
    name : 'adventure',
    initialState,
    reducers : {
        setadventuredetails : ( state, action)=>{
            state.adventureInfo = action.payload.adventureInfo
        },
        Logoutdetails : ( state, action)=>{
            state.adventureInfo = {}
        }
    }
})

export const{
    setadventuredetails,
    Logoutdetails
} = adventureSlice.actions

export default adventureSlice.reducer