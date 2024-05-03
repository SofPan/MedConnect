import { useReducer, useEffect } from "react";



export default function useApplicationData() {

  const initialState = {
    userLoggedIn: false,
    userInfo: {},
    selectedClinicId: 0
  }

  const [userState, dispatch] = useReducer((userState, action) => {
    switch (action.type) {
      case "USER_LOGIN":
        return {...userState, userLoggedIn: action.payload}
    case "USER_INFO":
        return {...userState, userInfo: action.payload}
    case "USER_INFO_LOGOUT":
        return {...userState, userInfo: action.payload}
    case "USER_STATE_LOGOUT":
        return {...userState, userLoggedIn: action.payload}
      default:
        return userState;
    }
  }, { ...initialState});


  //fetches photo info related to specific topic from backend
//   useEffect(()=>{
//     fetch(`/login/1`)
//     .then((res)=>{return res.json()})
//     .then((res)=>{
//       console.log(res);
//     }
//       )

//   }

//     , [userState.user]);

 
  return { userState, dispatch }
}