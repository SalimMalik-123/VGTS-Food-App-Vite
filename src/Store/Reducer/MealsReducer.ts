import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Meal, UserDetail } from '../../Pages/Home/IHome';




interface MealState {
  meal: Meal | null;
}

const initialState: MealState = {
  meal: null,
};

const UserSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    addMeal: (state: { meal: any; }, action: PayloadAction<Meal>) => {
      state.meal = action.payload;
    },
    updateMeal: (state, action: PayloadAction<Meal>) => {
      if (state.meal) {
        state.meal = { ...state.meal, ...action.payload };
      }
    },
    clearMeal: (state) => {
      state.meal = null;
    },
  },
});

export const { addMeal, updateMeal, clearMeal } = UserSlice.actions;

export default UserSlice.reducer;
