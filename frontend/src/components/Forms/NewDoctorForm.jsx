import { useState } from 'react';
import {
    Input,
    InputLabel,
    Button
  } from '@mui/material';

const NewDoctorForm = () => {
  const [doctor, setDoctor] = useState({});
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.elements.name.value);
  }
  return(
    <form onSubmit={handleSubmit}>
      <div>
        <InputLabel>Name</InputLabel>
        <Input id="name" type="text" />
      </div>
      <div>
        <InputLabel>Qualifications</InputLabel>
        <Input id="qualifications" type="text" />
      </div>
      <div>
        <InputLabel>Description</InputLabel>
        <Input id="description" type="text" />
      </div>
      <div>
        <InputLabel>Number of Patients</InputLabel>
        <Input id="num_patients" type="number" />
      </div>
      <div>
        <Button type="submit">Submit</Button>
      </div>

    </form>
  )
}

export default NewDoctorForm;