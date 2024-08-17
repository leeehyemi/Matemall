import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        email: null,
        token: null,
    },
    reducers: {
        setUser: (state, action) => {
            state.email = action.payload.email;
            state.token = action.payload.token;
        },
        clearUser: (state) => {
            state.email = null;
            state.token = null;
        },
    },

});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;