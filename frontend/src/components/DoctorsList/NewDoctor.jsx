import { useContext, useEffect, useState } from 'react';
import { usePost } from '../../hooks/useAPI';
import DoctorForm from '../Forms/DoctorForm';
import { UserSignedIn } from '../../App';

const NewDoctorForm = (props) => {
  const {clinic_id} = props;
  const [doctor, setDoctor] = useState({});
  const {dispatch} = useContext(UserSignedIn);

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

  const {post} = usePost();

  useEffect(() => {
    if(doctor.name){
      post(
        'doctors',
        doctor
      );
      dispatch({type: "ADD_DOCTOR", payload: doctor});
    } 
  }, [doctor]);


  return(
    <>
      <DoctorForm handleSubmit={handleSubmit}/>
    </>
  )
}

export default NewDoctorForm;