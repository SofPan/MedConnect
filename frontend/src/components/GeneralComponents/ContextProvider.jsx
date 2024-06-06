import React, { useEffect, useState } from 'react';
import useApplicationData from '../../hooks/useApplicationData';
import UserSignedIn from './UserSignedIn';
import { useLocation } from 'react-router-dom';

const ContextProvider = ({ children }) => {
  const { userState, dispatch } = useApplicationData();
  const [LoginDisplay, setLoginDisplay] = useState(false);
  const location = useLocation();
  const [loading, setLoading] = useState(true);


  const getUserInfoForSession = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8080/profile/${userId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) {
        throw new Error('Failed to register user');
      }
      const responseData = await response.json();
      dispatch({ type: "USER_INFO", payload: responseData });
      return responseData;
    } catch (error) {
      console.error('error getting user app.js:', error);
    }
  }

  useEffect(() => {
    const userId = sessionStorage.getItem('user_id');
    if (userId) {
      dispatch({ type: "USER_SESSION", payload: true });
      getUserInfoForSession(userId);
    } else {
      dispatch({ type: "USER_SESSION", payload: false });
    }
  }, []);

  useEffect(() => {
    if (userState.userInfo.id && loading) {
      setLoading(false);
    }
  }, [userState.userInfo.id, loading]);

  return (
    <UserSignedIn.Provider value={{ userState, dispatch, LoginDisplay, setLoginDisplay, location, loading }}>
      {children}
    </UserSignedIn.Provider>
  );
};

export default ContextProvider;
