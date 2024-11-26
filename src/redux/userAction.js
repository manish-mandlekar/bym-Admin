import { data } from "autoprefixer";
import Axios from "../Axios";
import { loaduser, setloading,addCategory , removeCategory } from "./userSlice";

export const asyncLoadUser = () => async (dispatch) => {
  try {
    dispatch(setloading(true));
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(setloading(false))
      return
    };
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
    dispatch(setloading(false));

  }
};
export const asyncLoadCategory = () => async (dispatch) => {
  try {
    dispatch(setloading(true));
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(setloading(false));
      return;
    }
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await Axios.get("/catagories", config);

    dispatch(addCategory(data));
    dispatch(setloading(false));
  } catch (err) {
    console.log(err);
    dispatch(setloading(false));
  }
};
export const removeCategoryAction = (id)=> async (dispatch)=>{
  try {
    Axios.delete(`/catagories/${id}`)
    dispatch(removeCategory({id}))
  } catch (error) {
    alert("failed to delete category",error.message)
  }
}
export const addCategory = ()=>()=>{
  try {
    dispatch(setloading(true))
    
  } catch (error) {
    
  }
}