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
        console.log(e.target);
        setFormData({
            ...formData,
            [name]: value
        });
    };
    

    const { dispatch } = useContext(UserSignedIn);

    const submitForm = async (e) => {
        e.preventDefault();
    
        // Get form data
        
        console.log(
            "YPPPPPPPPPPP", formData
        );
        // Construct request body
        
    
        try {
            // Make POST request to your backend
            const response = await fetch('your_backend_endpoint', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
    
            if (!response.ok) {
                throw new Error('Failed to log in');
            }
    
            // Assuming response is JSON
            const data = await response.json();
    
            // Dispatch action or handle response data
            dispatch({ type: "USER_INFO", payload: true });
    
            
        } catch (error) {
            console.error('Error:', error);
            // Handle error
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