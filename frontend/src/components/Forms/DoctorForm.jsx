import {
  Input,
  InputLabel,
  Button,
  Box
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledBox = styled(Box)({
  margin: "12px 0"
});

const DoctorForm = (props) => {
  const {handleSubmit} = props;
  
  return(
    <form onSubmit={handleSubmit}>
      <StyledBox type="div">
        <InputLabel>Name</InputLabel>
        <Input id="name" type="text" />
      </StyledBox>
      <StyledBox type="div">
        <InputLabel>Qualifications</InputLabel>
        <Input id="qualifications" type="text" />
      </StyledBox>
      <StyledBox type="div">
        <InputLabel>Description</InputLabel>
        <Input id="description" type="text" />
      </StyledBox>
      <StyledBox type="div">
        <InputLabel>Number of Patients</InputLabel>
        <Input id="num_patients" type="number" />
      </StyledBox>
      <StyledBox type="div" sx={{display: 'flex', justifyContent: 'space-evenly'}}>
        <Button type="submit">Submit</Button>
        <Button >Cancel</Button>
      </StyledBox>

    </form>
  )
}

export default DoctorForm;