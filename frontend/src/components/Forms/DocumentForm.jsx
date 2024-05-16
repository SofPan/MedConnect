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

const DocumentForm = (props) => {
  const {handleSubmit} = props;
  
  return(
    <form onSubmit={handleSubmit}>
      <StyledBox>
        <InputLabel>Name</InputLabel>
        <Input id="name" type="text" />
      </StyledBox>
      <StyledBox>
        <InputLabel>DocumentURL</InputLabel>
        <Input id="document_url" type="text" value="xray.jpg" disabled/>
      </StyledBox>
      <StyledBox>
        <Button type="submit">Submit</Button>
      </StyledBox>

    </form>
  )
}

export default DocumentForm;