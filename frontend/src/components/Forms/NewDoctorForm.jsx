import { useEffect, useState } from 'react';
import {
    Input,
    InputLabel,
    Button
  } from '@mui/material';
import { postDoctor } from '../../hooks/tempUseAPI';

const NewDoctorForm = (props) => {
  const {clinic_id, handleHideForm} = props;
  const [doctor, setDoctor] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const target = e.target.elements;
    setDoctor({
      clinic_id,
      name: target.name.value,
      qualifications: target.qualifications.value,
      description: target.description.value,
      photo_url: 'brown.jpg',
      number_of_patients: target.num_patients.value
    });
  }

  useEffect(() => {
    const createDoctor = async () => {
      await postDoctor(doctor);
    }

    createDoctor();
  }, [doctor]);


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
        <Button type="submit" onClick={handleHideForm}>Submit</Button>
      </div>

    </form>
  )
}

export default NewDoctorForm;