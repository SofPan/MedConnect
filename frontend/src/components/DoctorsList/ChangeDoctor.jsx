import { Button } from "@mui/material";


const ChangeDoctor = (props) => {
  const { handleCancel, handleChangeDoctorRequest, doctor_id } = props;

 

  return (
    <div>
      <Button onClick={() => handleChangeDoctorRequest(doctor_id)}>Request to change doctor</Button>
      <Button onClick={handleCancel}>Cancel</Button>
    </div>
  )
}

export default ChangeDoctor;