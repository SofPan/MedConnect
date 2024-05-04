import { useReducer, useEffect } from "react";



export default function useApplicationData() {

  const initialState = {
    userLoggedIn: false,
    userInfo: {},
    selectedClinicId: 0,
    events:[{ title: 'Event 1', start: new Date('2024-05-01T10:00:00') }],
    newUser: null
  }

  const registerUser = async (userData) => {
    try {
      const response = await fetch('http://localhost:8080/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to register user');
      }
  
      
      // Assuming the response contains some information about the newly registered user
      // You can handle the response data as needed
      console.log('User registered successfully:');
    } catch (error) {
      console.error('Error registering user:', error);
      // Handle error
    }
  };

 
  

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
        return {...userState, events: action.payload}
    case "NEW_USER":
        registerUser(action.payload);
        return {...userState, userInfo: action.payload}
    case "USER_SESSION":

        return {...userState, userLoggedIn: action.payload }
      
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
            
            const newEvents = data.map((event)=>{

              return { title: event.patient_id, start: new Date(event.details) };

            })
            dispatch({ type: "CLINIC_EVENTS", payload: newEvents});

        } catch (error) {
            console.error('Error:', error);
            // Handle error
        }
    };

    if (userState.selectedClinicId) {
        fetchData(); // Call the asynchronous function only if selectedClinicId is truthy
    }

}, [userState.selectedClinicId]);



 
  return { userState, dispatch }
}