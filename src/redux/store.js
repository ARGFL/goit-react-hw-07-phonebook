import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import contactsReducer from './contactsSlice';
import filterReducer from './filterSlice';

// Configure Redux Persist for contacts
const persistConfig = {
  key: 'contacts',
  storage,
  whitelist: ['contacts'],
};

// Wrap only contactsReducer with persistReducer
const persistedContactsReducer = persistReducer(persistConfig, contactsReducer);

// Combine reducers correctly
const rootReducer = combineReducers({
  contacts: persistedContactsReducer, // Ensure contacts is stored correctly
  filter: filterReducer,
});

// Configure store
export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false, // Fix Redux Persist serialization warnings
    }),
});

// Persist store
export const persistor = persistStore(store);
