
import React, { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import Calendar from './Calendar';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


import Grid from '@mui/material/Grid';





export default function PatientScheduler() {

  const handleChange = (e) =>{
    setinputValue(e.target.value)
  }
  const [inputValue, setinputValue ] = useState('');

  return (
    <div className="App">
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      
        <Grid container spacing={3}  justify="center">
          <Grid item xs={5} md={6}>
            <Paper>
              <Calendar inputValue={inputValue}/>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper>
            <h1>HEYYYY</h1>
            <input type="text"
                value={inputValue}
                onChange={handleChange}>
                </input>
            </Paper>
          </Grid>
         
          
          
      
      </Grid>
    </LocalizationProvider>
    </div>
  );
}

