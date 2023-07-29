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
import restaurantSlice from "./slices/restaurantSlice";

// Assigning our slice imports to a constant
const restaurantReducer = restaurantSlice;

// Persist configuration
const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}


const persistedReducer = persistReducer(persistConfig, restaurantReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// named export for persist
export let persistor = persistStore(store)

// default export for store
export default store;