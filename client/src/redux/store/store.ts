import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';  // Use localStorage or sessionStorage
import userSlice from '../slice/userSlice';
import { PersistPartial } from 'redux-persist/es/persistReducer'; // Import PersistPartial

// Define the persist configuration
const persistConfiguration = {
  key: 'root',  // Main key for the persisted state
  version: 1,
  storage,
  whitelist: ['User'], // Ensure only the 'User' slice is persisted
};

// Combine reducers
const rootReducer = combineReducers({
  User: userSlice,  // Add the user slice here
});

// Apply persisted reducer
const persistedReducer = persistReducer(persistConfiguration, rootReducer);

// Configure store with the persisted reducer and middleware
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Create persist store
export const persistor = persistStore(store);

// Export the store
export default store;

// Define RootState and AppDispatch for use in components
export type RootState = PersistPartial & {  // Extend with PersistPartial type
  User: ReturnType<typeof userSlice.reducer>;  // Add the type for 'User' slice
};

export type AppDispatch = typeof store.dispatch;
