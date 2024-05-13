import { useEffect, useState } from 'react';
import { usePost } from '../../hooks/useAPI';
import DoctorForm from '../Forms/DoctorForm';

const NewDoctorForm = (props) => {
  const {clinic_id, setLoading} = props;
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

  const {postLoading, postData, post} = usePost();

  useEffect(() => {
    setLoading(true);
    doctor.name && 
      post(
        'doctors',
        doctor
      );
    setLoading(postLoading);
  }, [doctor]);


  return(
    <>
      <DoctorForm handleSubmit={handleSubmit}/>
    </>
  )
}

export default NewDoctorForm;