import {persistStore,persistReducer,FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER} from 'redux-persist'
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import UserSlice from './UserSlice'
import AdventureSlice from './AdventureSlice'

const persistConfig ={
    key : "root",
    storage,
};

const persistedUserReducer = persistReducer(persistConfig,UserSlice);
const persistedAdventureReducer = persistReducer(persistConfig,AdventureSlice)

const Store = configureStore({
    reducer : {
        user : persistedUserReducer,
        adventure : persistedAdventureReducer
    },
    middleware:getDefaultMiddleware({
        serializableCheck:{
            ignoreActions: [FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER]
        }
    })
})

const persistor = persistStore(Store)

export {Store,persistor};