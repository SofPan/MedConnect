import { useContext, useEffect, useState } from 'react';
import DoctorForm from '../Forms/DoctorForm';
import { usePut } from '../../hooks/useAPI';
import UserSignedIn from '../GeneralComponents/UserSignedIn';

const EditDoctorForm = (props) => {
  const {doctor} = props;

  const [editDoctor, setEditDoctor] = useState(doctor);
  const [editing, setEditing] = useState(false);
  const {dispatch} = useContext(UserSignedIn);
  
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

  const {put} = usePut();


  useEffect(() => {
    if(editing){
      put(
        'doctors',
        editDoctor
      );
      dispatch({type: "EDIT_DOCTOR", payload: editDoctor});
    }
  }, [editing])

  return(
    <>
      <DoctorForm handleSubmit={handleSubmit} />
    </>
  )
}

export default EditDoctorForm;