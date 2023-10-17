import {persistStore,persistReducer} from 'redux-persist'
import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import UserSlice from './UserSlice'

const persistConfig ={
    key : "root",
    storage,
};

const persistedUserReducer = persistReducer(persistConfig,UserSlice);


const Store = configureStore({
    reducer : {
        user : persistedUserReducer,
       
    }
})

const persistor = persistStore(Store)

export {Store,persistor};