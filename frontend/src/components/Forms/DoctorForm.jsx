import {
  Input,
  InputLabel,
  Button
} from '@mui/material';

const DoctorForm = (props) => {
  const {handleSubmit} = props;
  
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

export default DoctorForm;