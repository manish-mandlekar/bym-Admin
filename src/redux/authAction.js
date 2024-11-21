import { data } from "autoprefixer";
import Axios from "../Axios";
import { loaduser } from "./authSlice";

export const asyncLoadUser = (user) => async (dispatch) => {
  try {
    const data = await Axios.post(`/auth/send-otp`, {
      email: user.email,
      name: user.name,
      password: user.password,
      role: "student",
    });
    alert("OTP has been sent succesfully to your email");
  } catch (error) {
    console.log(error);
    alert("Failed to send OTP. Please try again.");
  }
};
export const asyncOtpVerify = (email,otp) => async (dispatch) => {
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
      dispatch({ type: 'SET_LOGGED_IN', payload: true });
    } else {
      alert("Login failed. Please check your credentials.");
    }
  } catch (error) {
    console.log(error);
    alert("Login failed. Please check your credentials.");
  }
};
