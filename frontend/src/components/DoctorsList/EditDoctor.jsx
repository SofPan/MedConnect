import { useEffect, useState } from 'react';
import DoctorForm from '../Forms/DoctorForm';
import { putDoctor } from '../../hooks/tempUseAPI';

const EditDoctorForm = (props) => {
  const {doctor} = props;

  const [editDoctor, setEditDoctor] = useState(doctor);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const target = e.target.elements;
    setEditDoctor(() => ({
      name: target.name.value && target.name.value,
      qualifications: target.qualifications.value && target.qualifications.value,
      description: target.description.value && target.description.value,
      number_of_patients: target.num_patients.value
    }));
  }

  useEffect(() => {
    const editDoctorRequest = async () => {
      await putDoctor(doctor.id);
    }

    editDoctorRequest();
  }, [editDoctor])

  return(
    <>
      <DoctorForm handleSubmit={handleSubmit} />
    </>
  )
}

export default EditDoctorForm;