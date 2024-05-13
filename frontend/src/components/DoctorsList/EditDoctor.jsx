import { useEffect, useState } from 'react';
import DoctorForm from '../Forms/DoctorForm';
import { usePut } from '../../hooks/useAPI';

const EditDoctorForm = (props) => {
  const {doctor, handleChange} = props;

  const [editDoctor, setEditDoctor] = useState(doctor);
  const [editing, setEditing] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const target = e.target.elements;
    setEditDoctor(prev => ({
      ...prev,
      name: target.name.value && target.name.value,
      qualifications: target.qualifications.value && target.qualifications.value,
      description: target.description.value && target.description.value,
      number_of_patients: target.num_patients.value
    }));
    setEditing(true);
  }

  const {putLoading, putData, put} = usePut();


  useEffect(() => {
    editing && put(
      'doctors',
      editDoctor
    )
    handleChange();
  }, [editing])

  return(
    <>
      <DoctorForm handleSubmit={handleSubmit} />
    </>
  )
}

export default EditDoctorForm;