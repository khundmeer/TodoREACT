import { configureStore } from "@reduxjs/toolkit";
import listsReducer from './sliceLists'
import configReducer from './sliceConfig'
import modalsReducer from './sliceModals'
import { todoApi } from "./API_Service/TODO_API";

const store = configureStore({
  reducer: {
    lists: listsReducer,
    config: configReducer,
    modals: modalsReducer,
    [todoApi.reducerPath]: todoApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todoApi.middleware),
})

export default store

export type RootState = ReturnType<typeof store.getState>