import {
  Input,
  InputLabel,
  Button,
  Box
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledBox = styled(Box)({
  margin: "12px 0",
});

const StyledLabel = styled(InputLabel)({
  fontSize: '14px',
})

const StyledInput = styled(Input)({
  width: "90%",
})

const DoctorForm = (props) => {
  const {handleSubmit} = props;
  
  return(
    <form onSubmit={handleSubmit}>
      <StyledBox type="div">
        <StyledLabel>Name</StyledLabel>
        <StyledInput type="text" onClick={e => e.stopPropagation()}/>
      </StyledBox>
      <StyledBox type="div">
        <StyledLabel>Qualifications</StyledLabel>
        <StyledInput type="text" onClick={e => e.stopPropagation()}/>
      </StyledBox>
      <StyledBox type="div">
        <StyledLabel>Description</StyledLabel>
        <StyledInput type="text" onClick={e => e.stopPropagation()}/>
      </StyledBox>
      <StyledBox type="div">
        <StyledLabel>Number of Patients</StyledLabel>
        <StyledInput type="number" onClick={e => e.stopPropagation()}/>
      </StyledBox>
      <StyledBox type="div" sx={{display: 'flex', justifyContent: 'space-between', width: "90%"}}>
        <Button variant="small" type="submit">Submit</Button>
        <Button variant="small" >Cancel</Button>
      </StyledBox>

    </form>
  )
}

export default DoctorForm;