import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseApiUrl from "../../config/apiconfig";



export const RegisterAsync = createAsyncThunk(
    'user/register',
    async({ userName, email, password }, thunkAPI) => {
        try {
            const response = await axios.post(`${baseApiUrl}/api/Users`, {
                userName: userName,
                email: email,
                password: password
            });
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

const initialState = {
    nameSurname: null,
    userName: null,
    email: null,
    password: null,
    loading: false,
};

export const UserSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setUserName: (state, action) => {
            state.userName = action.payload.userName;
        },
        setIsLoading: (state, action) => {
            state.loading = action.payload.loading;
        },
        setEmail: (state, action) => {
            state.email = action.payload.email;
        },
        setPassword: (state, action) => {
            state.password = action.payload.password;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(RegisterAsync.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(RegisterAsync.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(RegisterAsync.rejected, (state, action) => {
            state.loading = false;
        });
    }
});

export const { setUserName, setIsLoading, setEmail, setPassword } = UserSlice.actions;
export default UserSlice.reducer;