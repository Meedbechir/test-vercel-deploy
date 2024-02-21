import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/AuthSlice";
import sondageReducer from '../features/SondageSlices';

const store = configureStore({
  reducer: {
    auth: authReducer,
    sondage: sondageReducer,
  },
});

export default store;
