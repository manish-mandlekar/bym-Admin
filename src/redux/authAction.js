import { data } from "autoprefixer";
import Axios from "../Axios";
import { loaduser } from "./authSlice";

export const asyncLoadUser = (user) => async (dispatch) => {
  try {
    const data = await Axios.post(`/auth/send-otp`, {
      email: user.email,
      name: user.name,
      password: user.password,
      role: user.role,
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
    dispatch(loaduser(user));
  } catch (error) {
    console.log(error);
  }
};
