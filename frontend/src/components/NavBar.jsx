import * as React from 'react';
import { useContext } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { UserSignedIn } from "../App"
import LoginForm from './LoginForm';
import { NavLink, useNavigate } from "react-router-dom";
import axios from 'axios';


export default function NavBar({setLoginDisplay, LoginDisplay}) {

    const { userState, dispatch } = useContext(UserSignedIn);
    
    const navigate = useNavigate();
    
    const handleProfileClick = () => {
       console.log("Profile click", userState.useInfo)
       if (userState.userInfo.is_clinic) {
        axios.get(`http://localhost:8080/clinics/${userState.userInfo.id}`)
            .then((res) => {
                if(res.data) navigate("/profile")
            })
            .catch(error => {
                console.error("Error fetching clinic:", error);
              });
       } else {
        axios.get(`http://localhost:8080/patients/${userState.userInfo.id}`)
            .then((res) => {
                if(res.data) navigate("/profile")
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
        sessionStorage.user_id = '';
        dispatch({type:"USER_INFO_LOGOUT", payload:{}})
        dispatch({type:"USER_STATE_LOGOUT", payload:false})
       
    };


    return (

        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                    >
                        <NavLink style={{ textDecoration: 'none', color: 'white' }} to="/">
                            MEDCONNECT
                        </NavLink>
                    </Typography>
                    <MenuItem>
                        <NavLink style={{ textDecoration: 'none', color: 'white' }} to="/availabledoctors">
                            AVAILABLE DOCTORS
                        </NavLink>
                    </MenuItem>

                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>

                            {LoginDisplay && <LoginForm setLoginDisplay={setLoginDisplay}/>}

                        {userState.userLoggedIn ?  (
                            <>
                                <MenuItem onClick={handleProfileClick}>
                                    Profile
                                </MenuItem>
                                <MenuItem onClick={handleLogout}>
                                  <NavLink style={{ textDecoration: 'none', color: 'white' }} to="/">
                                    Logout
                                  </NavLink>
                                </MenuItem>
                            </>
                        ): (<><MenuItem onClick={handleLogin}>Login</MenuItem>
                        <MenuItem>
                            <NavLink style={{ textDecoration: 'none', color: 'white' }} to="/signup">
                              Sign Up
                            </NavLink>
                        </MenuItem>
                        </>)}
                    </Box>
                   
                </Toolbar>
            </AppBar>
        </Box>
    );
}