import { createSlice } from '@reduxjs/toolkit';

export const sondageSlice = createSlice({
  name: 'sondage',
  initialState: {
    LienSondage: '',
  },
  reducers: {
    setLienSondage: (state, action) => {
      state.LienSondage = action.payload;
    },
  },
});

export const { setLienSondage } = sondageSlice.actions;

export const selectLienSondage = (state) => state.sondage.LienSondage;

export default sondageSlice.reducer;
