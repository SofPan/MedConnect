import { useEffect, useState } from 'react';

import { postDoctor } from '../../hooks/tempUseAPI';
import DoctorForm from '../Forms/DoctorForm';

const NewDoctorForm = (props) => {
  const {clinic_id, addDoctor} = props;
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
      console.log("1 NewDoctorForm");
      await postDoctor(doctor);
      console.log("? NewDoctorForm");
    }

    if (doctor.name){
      createDoctor();
      addDoctor();
    } 
  }, [doctor]);


  return(
    <>
      <DoctorForm handleSubmit={handleSubmit}/>
    </>
  )
}

export default NewDoctorForm;