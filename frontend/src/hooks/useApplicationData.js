import { useReducer, useEffect } from "react";



export default function useApplicationData() {

  const initialState = {
    userLoggedIn: false,
    userInfo: {}
  }

  const [userState, dispatch] = useReducer((userState, action) => {
    switch (action.type) {
      case "USER_LOGIN":
        return {...userState, userInfo: action.payload}
      default:
        return userState;
    }
  }, { ...initialState});


  //fetches photo info related to specific topic from backend
  useEffect(()=>{

    
    fetch(`/login/1`)
    .then((res)=>{return res.json()})
    .then((res)=>{
      console.log(res);
    }
      )

  }

    , [userState.user]);

 
  return { userState, dispatch }
}