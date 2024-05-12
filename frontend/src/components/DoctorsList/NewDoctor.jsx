import { useEffect, useState } from 'react';

import { postDoctor } from '../../hooks/tempUseAPI';
import DoctorForm from '../Forms/DoctorForm';
import { usePost } from '../../hooks/useAPI';

const NewDoctorForm = (props) => {
  const {clinic_id} = props;
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

  const {responseLoading, responseData, post} = usePost();

  useEffect(() => {
    doctor.name && 
      post(
        'doctors',
        doctor
      );
  }, [doctor]);


  return(
    <>
      <DoctorForm handleSubmit={handleSubmit}/>
    </>
  )
}

export default NewDoctorForm;