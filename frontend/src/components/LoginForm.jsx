import * as React from 'react';
import { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { UserSignedIn } from '../App';

export default function LoginForm() {

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
    

    const { dispatch } = useContext(UserSignedIn);

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
            const user = await response.json();
            
            const userObject = user.reduce((acc, obj) => {
              
              if (obj) {
                
                Object.assign(acc, obj);
              }
              return acc;
            }, {});
            
            sessionStorage.setItem("user_id", userObject.id)
           
            dispatch({ type: "USER_INFO", payload: userObject });
    
            dispatch({ type: "USER_LOGIN", payload: true });
            
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
       <Button type="submit"variant="contained" >Submit</Button>
       
      </div>
    </Box>
  );
}