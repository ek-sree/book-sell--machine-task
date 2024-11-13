import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Datas {
    _id: string | null;
    email: string | null;
    name: string | null;
}

interface UserState {
    isAuthenticated: boolean;
    token: string | null;
    authdata: Datas | null;
}

const initialState : UserState = {
    isAuthenticated:false,
    token: null,
    authdata:null
}


const userSlice = createSlice({
    name: 'UserSlice',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{token:string, authdata: Datas}>) =>{
            state.isAuthenticated=true;
            state.token=action.payload.token;
            state.authdata= action.payload.authdata;
        },

        logout: (state) =>{
            state.isAuthenticated =false;
            state.token = null;
            state.authdata=null;
        }
    }
})

export const {login, logout} = userSlice.actions;
export default userSlice;