import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserDetail } from '../../Pages/Home/IHome';




interface UserState {
  user: UserDetail | null;
}

const initialState: UserState = {
  user: null,
};

const UserSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    addUserDetail: (state: { user: any; }, action: PayloadAction<UserDetail>) => {
      state.user = action.payload;
    },
    updateUserDetail: (state, action: PayloadAction<UserDetail>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    clearUserDetail: (state) => {
      state.user = null;
    },
  },
});

export const { addUserDetail, updateUserDetail, clearUserDetail } = UserSlice.actions;

export default UserSlice.reducer;
