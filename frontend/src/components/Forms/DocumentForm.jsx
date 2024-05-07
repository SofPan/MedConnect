import {
  Input,
  InputLabel,
  Button
} from '@mui/material';

const DocumentForm = (props) => {
  const {handleSubmit} = props;
  
  return(
    <form onSubmit={handleSubmit}>
      <div>
        <InputLabel>Name</InputLabel>
        <Input id="name" type="text" />
      </div>
      <div>
        <InputLabel>DocumentURL</InputLabel>
        <Input id="document_url" type="text" value="xray.jpg" disabled/>
      </div>
      <div>
        <Button type="submit">Submit</Button>
      </div>

    </form>
  )
}

export default DocumentForm;