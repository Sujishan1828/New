import axios from 'axios';
import { clearError, forgotPasswordFail, forgotPasswordRequest, forgotPasswordSuccess, loadUserFail, loadUserRequest, loadUserSuccess, loginFail, loginRequest, loginSuccess, logoutFail, logoutSuccess, registerFail, registerRequest, registerSuccess, resetPasswordFail, resetPasswordRequest, resetPasswordSuccess, updatePasswordFail, updatePasswordRequest, updatePasswordSuccess, updateProfileFail, updateProfileRequest, updateProfileSuccess } from '../slices/authSlice';
import { deleteUserFail, deleteUserRequest, deleteUserSuccess, updateUserFail, updateUserRequest, updateUserSuccess, userFail, userRequest, usersFail, usersRequest, usersSuccess, userSuccess } from '../slices/userSlice';

export const loginUser =(email,password)=> async(dispatch)=>{
  try {
    dispatch(loginRequest())
    const {data} = await axios.post('/api/v1/user/login',{email,password});
    dispatch(loginSuccess(data))
  } catch (error) {
    dispatch(loginFail(error.response.data.message))
  }
}

export const authClearError = (dispatch)=>{
  dispatch(clearError())
}

export const registerUser =(userData)=> async(dispatch)=>{
  try {
    dispatch(registerRequest())

    const config = {
      headers:{
        'Content-type':'multipart/form-data'
      }
    }

    const {data} = await axios.post('/api/v1/user/register',userData,config);
    dispatch(registerSuccess(data))
  } catch (error) {
    dispatch(registerFail(error.response.data.message))
  }
}

export const loadUserUser =async(dispatch)=>{
  try {
    dispatch(loadUserRequest())
    const {data} = await axios.get('/api/v1/user/myprofile');
    dispatch(loadUserSuccess(data))
  } catch (error) {
    dispatch(loadUserFail(error.response.data.message))
  }
}

export const logoutUser = async(dispatch)=>{
  try {
    await axios.get('/api/v1/user/logout');
    dispatch(logoutSuccess())
  } catch (error) {
    dispatch(logoutFail(error?.response?.data?.message || error.message || "Logout failed"))
  }
}

export const updateUserProfile =(userData)=> async(dispatch)=>{
  try {
    dispatch(updateProfileRequest())

    const config = {
      headers:{
        'Content-type':'multipart/form-data'
      }
    }

    const {data} = await axios.put('/api/v1/user/updateprofile',userData,config);
    dispatch(updateProfileSuccess(data))
  } catch (error) {
    dispatch(updateProfileFail(error.response.data.message))
  }
}

export const updateUserPassword =(formData)=> async(dispatch)=>{
  try {
    dispatch(updatePasswordRequest())

    const config = {
      headers:{
        'Content-Type': 'application/json',
      }
    }
    
    await axios.put('/api/v1/user/password/change',formData,config);
    dispatch(updatePasswordSuccess())
  } catch (error) {
    dispatch(updatePasswordFail(error.response.data.message))
  }
}

export const forgotPassword = (formData) => async (dispatch) => {

    try {
        dispatch(forgotPasswordRequest())
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        const { data} =  await axios.post(`/api/v1/user/password/forgot`, formData, config);
        dispatch(forgotPasswordSuccess(data))
    } catch (error) {
        dispatch(forgotPasswordFail(error.response.data.message))
    }

}

export const resetPassword = (formData, token) => async (dispatch) => {

    try {
        dispatch(resetPasswordRequest())
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        const { data} =  await axios.post(`/api/v1/user/password/reset/${token}`, formData, config);
        dispatch(resetPasswordSuccess(data))
    } catch (error) {
        dispatch(resetPasswordFail(error.response.data.message))
    }

}

//admin parts

export const adminGetUsers =  async (dispatch) => {

    try {
        dispatch(usersRequest())
        const { data }  = await axios.get(`/api/v1/admin/user/all`);
        dispatch(usersSuccess(data))
    } catch (error) {
        dispatch(usersFail(error.response.data.message))
    }

}


export const adminGetUser = id => async (dispatch) => {

    try {
        dispatch(userRequest())
        const { data }  = await axios.get(`/api/v1/admin/user/${id}`);
        dispatch(userSuccess(data))
    } catch (error) {
        dispatch(userFail(error.response.data.message))
    }

}

export const adminDeleteUser = id => async (dispatch) => {

    try {
        dispatch(deleteUserRequest())
        await axios.delete(`/api/v1/admin/user/${id}`);
        dispatch(deleteUserSuccess())
    } catch (error) {
        dispatch(deleteUserFail(error.response.data.message))
    }

}

export const adminUpdateUser = (id, formData) => async (dispatch) => {

    try {
        dispatch(updateUserRequest())
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        await axios.put(`/api/v1/admin/user/${id}`, formData, config);
        dispatch(updateUserSuccess())
    } catch (error) {
        dispatch(updateUserFail(error.response.data.message))
    }

}
