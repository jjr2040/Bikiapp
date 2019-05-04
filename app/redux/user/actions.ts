import { 
  User,
  SET_USER 
} from "./types";
// import axios from 'axios';
// import { Dispatch } from "redux";

// const client = axios.create({
//   baseURL: 'https://46idh6p87i.execute-api.us-east-1.amazonaws.com/dev/auth/',
//   timeout: 6000,
//   headers: {
//     'bikiapp-agent': 'city'
//   }
// });

export function setCurrentUser(user: User) {
  return {
    type: SET_USER,
    payload: user
  }
}

// export function registerUser(user: User) {
//   return (dispatch: Dispatch) => {
//     dispatch({type: LOADING});
//     client.post('register', user).then( res => {
//       dispatch({
//         type: REGISTER_SUCCESS,
//         payload: user
//       });
//     }).catch( error => {
//       dispatch({
//         type: REGISTER_FAILURE,
//         payload: {
//           message: error.response.data.Error,
//           code: error.response.data.Code
//         }
//       });      
//     });
//   };
// };

// export function loginUser(email: string, password: string) {
//   return (dispatch: Dispatch) => {
//     dispatch({type: LOADING});
//     client.post('login', {
//       email: email,
//       password: password
//     }).then( res => {
//       dispatch({
//         type: LOGIN_SUCCESS,
//         payload: res.data.user
//       });
//     }).catch( error => {
//       dispatch({
//         type: LOGIN_FAILURE,
//         payload: {
//           message: error.response.data.Error,
//           code: error.response.data.Code
//         }
//       });
//     });
//   };
// };

// export function verifyUser(email: string, code: string) {
//   return (dispatch: Dispatch) => {
//     dispatch({type: LOADING});
//     client.post('verify', {
//       email: email,
//       code: code
//     }).then( res => {
//       dispatch({
//         type: VERIFY_SUCCESS,
//         payload: res.data
//       });
//     }).catch( error => {
//       dispatch({
//         type: VERIFY_FAILURE,
//         payload: {
//           message: error.response.data.Error,
//           code: error.response.data.Code
//         }
//       });
//     });
//   };
// };