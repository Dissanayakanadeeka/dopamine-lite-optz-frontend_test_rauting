import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  username: string | null;
  userId: string | null;
  email: string | null;
  isAuthenticated: boolean;
  loginId: string | null;
  isLoading: boolean;
}

const initialState: UserState = {
  username: null,
  userId: null,
  email: null,
  isAuthenticated: false,
  loginId: null,
  isLoading: true,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Partial<UserState>>) => {
      return { ...state, ...action.payload, isAuthenticated: true, isLoading: false };
    },
    clearUser: (_state) => {
      return {...initialState, isLoading: false};
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;