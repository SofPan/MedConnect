import { useReducer, useEffect } from "react";



export default function useApplicationData() {

  const initialState = {
    userLoggedIn: false,
    userInfo: {},
    selectedClinicId: 0,
    events:[{ title: 'Event 1', start: new Date('2024-05-01T10:00:00') }]
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
    case "USER_SELECTED_CLINIC":
        return {...userState, selectedClinicId: action.payload}
    case "CLINIC_EVENTS":
        console.log("new event", action);
        return {...userState, events: action.payload}
      default:
        return userState;
    }
  }, { ...initialState});

  
  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:8080/calendar/${userState.selectedClinicId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error('Failed to get appointments');
            }

            const data = await response.json();
            const newEvent = { title: data.patient_id, start: new Date(data.details) };

            dispatch({ type: "CLINIC_EVENTS", payload: [newEvent]});

        } catch (error) {
            console.error('Error:', error);
            // Handle error
        }
    };

    if (userState.selectedClinicId) {
        fetchData(); // Call the asynchronous function only if selectedClinicId is truthy
    }

}, [userState.selectedClinicId]);


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