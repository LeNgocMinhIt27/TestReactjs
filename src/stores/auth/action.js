import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiGetMe, apiLogin, apiLogout } from "../../api/auth/auth.api";
import { getToken, setToken } from "../../api/auth/helper";
export const loginAction = createAsyncThunk(
  "user/login",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await apiLogin(data);
      setToken(response.access_token);
      dispatch(getInfoAction());
      return response;
    } catch (err) {
      console.log("🚀 ~ err", err);
      return rejectWithValue(err.response.data.message);
    }
  }
);
export const logoutAction = createAsyncThunk("user/logout", async () => {
  const response = await apiLogout();
  return response;
});
export const getInfoAction = createAsyncThunk("user/me", async () => {
  const response = await apiGetMe();
  return response;
});
export const getInitData = createAsyncThunk(
  "user/init",
  async (_, { dispatch }) => {
    if (getToken()) dispatch(getInfoAction());
  }
);
export const loginReduces = (builder) => {
  builder
    .addCase(loginAction.pending, (state) => {
      state.loading = true;
      state.errorMessage = "";
    })
    .addCase(loginAction.fulfilled, (state) => {
      state.loading = false;
      state.logged = true;
    })
    .addCase(loginAction.rejected, (state, action) => {
      state.loading = false;
      state.logged = false;
      if (action.error) state.errorMessage = action.payload.message;
    });
};
export const getInfoReduces = (builder) => {
  builder
    .addCase(getInfoAction.pending, (state) => {
      state.loadingInfo = true;
    })
    .addCase(getInfoAction.fulfilled, (state, action) => {
      state.loadingInfo = false;
      state.currentUser = action.payload;
    })
    .addCase(getInfoAction.rejected, (state) => {
      state.loadingInfo = false;
      state.logged = false;
      state.currentUser = undefined;
      setToken("");
    });
};
export const logoutReduces = (builder) => {
  builder
    .addCase(logoutAction.rejected, (state) => {
      state.currentUser = undefined;
      state.errorMessage = "";
      state.logged = false;
      state.loading = false;
      setToken("");
    })
    .addCase(logoutAction.fulfilled, (state) => {
      state.currentUser = undefined;
      state.errorMessage = "";
      state.logged = false;
      state.loading = false;
      setToken("");
    });
};
