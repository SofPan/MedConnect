import * as React from 'react';
import { useContext } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { UserSignedIn } from '../App';

export default function LoginForm() {

    const { dispatch } = useContext(UserSignedIn);

    const submitForm = (e) => {
        e.preventDefault();
        dispatch({type:"USER_LOGIN", payload:true})
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
           
            
          />
        <TextField
          id="standard-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="outlined"
          required
        />
       <Button type="submit"variant="contained" >Submit</Button>
       
      </div>
    </Box>
  );
}