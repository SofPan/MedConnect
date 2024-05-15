import * as React from 'react';
import { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { UserSignedIn } from '../App';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function LoginForm({ setLoginDisplay }) {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    
    // Change handler to update state
    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(value);
        setFormData({
            ...formData,
            [name]: value
        });
    };
    

    const { userState, dispatch } = useContext(UserSignedIn);

    const navigate = useNavigate();

    const submitForm = async (e) => {

        e.preventDefault();
        try {
            // Make POST request to your backend
            const response = await fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            console.log("response",response)
            console.log("formData ", formData)
    
            if (!response.ok) {
                throw new Error('Failed to log in');

            }
    
            // Assuming response is JSON
            const userResponse = await response.json();
            
            const userObject = userResponse.reduce((acc, obj) => {
              
              if (obj) {
                
                Object.assign(acc, obj);
              }
              return acc;
            }, {});

            const user = {...userObject, user_id: userObject.id}

            console.log("user in log in ", user)
            
            sessionStorage.setItem("user_id", user.id)
           
            dispatch({ type: "USER_INFO", payload: user });
    
            dispatch({ type: "USER_LOGIN", payload: true });

            setLoginDisplay(false);
            

            console.log("userObject in Login ", userObject)

            if (user.is_clinic) {
              axios.get(`http://localhost:8080/clinics/${user.user_id}`)
                  .then((res) => {
                      if(!res.data) {
                          navigate("/required_information")
                      }
                  })
                  .catch(error => {
                      console.error("Error fetching clinic:", error);
                    });
             } else {
              axios.get(`http://localhost:8080/patients/${user.user_id}`)
              .then((res) => {
                  if(!res.data) {
                      navigate("/required_information")
                  }
              })
                  .catch(error => {
                      console.error("Error fetching patient:", error);
                    });
             }
            
        } catch (error) {
            console.error('Error:', error);
            // Handle error
            console.log(error)
        }
    }

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
      onSubmit={submitForm}
    >
      <div >
        
      
          <TextField
            id="standard-helperText"
            label="Email"
            variant="outlined"
            required
           onChange={handleChange}
            name="email"
          />
        <TextField
          id="standard-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="outlined"
          required
          name="password"
          onChange={handleChange}
        />
       <Button type="submit"variant="contained" sx={{ mt: 2 }}>Submit</Button>
       
      </div>
    </Box>
  );
}