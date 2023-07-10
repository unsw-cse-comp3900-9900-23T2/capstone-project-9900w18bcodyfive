import { configureStore } from "@reduxjs/toolkit";
// Imports related to persisting states
// ====================================================================================================================================================================
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
//======================================================================================================================================================================

// importing our slices
import managerSlice from "./slices/managerSlice";

//Assigning the imports to a variable
const managerReducer = managerSlice;

// Persist configuration
const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}

const persistedReducer = persistReducer(persistConfig, managerReducer)

const store = configureStore({
    reducer: {
        manager: persistedReducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store)

export default store;
