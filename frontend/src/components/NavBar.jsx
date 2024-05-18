import * as React from 'react';
import { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import { UserSignedIn } from "../App"
import LoginForm from './LoginForm';
import { NavLink, useNavigate } from "react-router-dom";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import axios from 'axios';


export default function NavBar({setLoginDisplay, LoginDisplay}) {

    const { userState, dispatch } = useContext(UserSignedIn);
    
    const navigate = useNavigate();
    
    const handleProfileClick = () => {
       console.log("Profile click", userState.userInfo)
       if (userState.userInfo.is_clinic) {
        axios.get(`http://localhost:8080/clinics/${userState.userInfo.user_id}`)
            .then((res) => {
                if(res.data) {
                    console.log("re data",res)
                  navigate("/profile") 
                } else {
                  navigate("/required_information")
                }
            })
            .catch(error => {
                console.error("Error fetching clinic:", error);
              });
       } else {
        axios.get(`http://localhost:8080/patients/${userState.userInfo.user_id}`)
        .then((res) => {
            if(res.data) {
                navigate("/profile") 
            } else {
                navigate("/required_information")
            }
        })
            .catch(error => {
                console.error("Error fetching patient:", error);
              });
       }
    };

    const handleLogin = () =>{
        setLoginDisplay(!LoginDisplay)
    }
    const handleLogout = () => {
        console.log("Log out", userState.userInfo)
        sessionStorage.user_id = '';
        dispatch({type:"USER_INFO_LOGOUT", payload:{}})
        dispatch({type:"USER_STATE_LOGOUT", payload:false})
        dispatch({type:"SET_CLINIC_INFO", payload:{}})
    };


    return (
      <AppBar position="static">
          <Toolbar>
            <Typography
                variant="h6"
                noWrap
                component="div"
                className="flex items-center justify-between"
            >
                  <LocalHospitalIcon className="mr-1"/>
                <NavLink style={{ textDecoration: 'none', color: 'white' }} to="/">
                    MEDCONNECT
                </NavLink>
            </Typography>
              <MenuItem>
                  <NavLink to="/availabledoctors" className="hover:border-b-2 hover:border-white border-b-2 border-transparent transition ease-out duration-300 color-white">
                      AVAILABLE DOCTORS
                  </NavLink>
              </MenuItem>
              <Box sx={{ flexGrow: 1 }} />
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                  
    {userState.userLoggedIn ? (
      <>
        <MenuItem onClick={handleProfileClick} >
          <NavLink className="hover:background-transparent hover:border-b-2 hover:border-white border-b-2 border-transparent transition ease-out duration-300 color-white">
            Profile
          </NavLink>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <NavLink to="/" className="hover:background-transparent hover:border-b-2 hover:border-white border-b-2 border-transparent transition ease-out duration-300 color-white">
            Logout
          </NavLink>
        </MenuItem>
        </>
      ) : (
        LoginDisplay ? (
        <LoginForm setLoginDisplay={setLoginDisplay} />
      ) : (
        <>
          <MenuItem onClick={handleLogin}>
            <NavLink className="hover:background-transparent hover:border-b-2 hover:border-white border-b-2 border-transparent transition ease-out duration-300 color-white">
              Login
            </NavLink>
          </MenuItem>
          <MenuItem>
              <NavLink className="hover:background-transparent hover:border-b-2 hover:border-white border-b-2 border-transparent transition ease-out duration-300 color-white" to="/signup">
                  Sign Up
              </NavLink>
          </MenuItem>
        </>
      )
      )}

          </Box>
              
        </Toolbar>
      </AppBar>

    );
}