
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import UserReducer from './Reducer/UserReducer';
import MealsReducer from './Reducer/MealsReducer';



const store = configureStore({
    reducer: {
      User : UserReducer,
      Meal : MealsReducer,
    },
  });


export default store;