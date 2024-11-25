import { data } from "autoprefixer";
import Axios from "../Axios";
import { loaduser, setloading } from "./userSlice";

export const asyncLoadUser = () => async (dispatch) => {
  try {
    dispatch(setloading(true));
    const token = localStorage.getItem("token");
    if (!token) return;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await Axios.get("/me", config);
    dispatch(loaduser(data));
    dispatch(setloading(false));
  } catch (err) {
    console.log(err);
  }
};
export const asyncOtpVerify = (email, otp) => async (dispatch) => {
  try {
    const user = await Axios.post(`/auth/verify-otp`, {
      email: email,
      otp: otp,
    });

    console.log(user);
  } catch (error) {
    console.log(error);
  }
};

export const asyncLoginUser = (email, password) => async (dispatch) => {
  try {
    const response = await Axios.post(`/auth/login`, { email, password });

    if (response.status === 200) {
      dispatch(loaduser(response.data));
      localStorage.setItem("userToken", response.data.token);
      alert("Login successful!");
      dispatch({ type: "SET_LOGGED_IN", payload: true });
    } else {
      alert("Login failed. Please check your credentials.");
    }
  } catch (error) {
    console.log(error);
    alert("Login failed. Please check your credentials.");
  }
};
