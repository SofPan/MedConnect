import { useContext, useEffect, useState } from 'react';
import { useDelete } from '../../hooks/useAPI';
import { Button } from '@mui/material';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { UserSignedIn } from '../../App';

const DocumentsListItem = (props) => {
  const {
    id,
    name,
  } = props;

  const {dispatch} = useContext(UserSignedIn);

  const [deleting, setDeleting] = useState(false);
  const {deleteRecord} = useDelete();




  useEffect(() => {
    if(deleting){
      deleteRecord(
        'documents',
        id
      )
      dispatch({type: "DELETE_DOCUMENT", payload: {id}});
    }
  }, [deleting])

  return(
    <li>
      <DescriptionOutlinedIcon/>
      <span>{name}</span>
      <Button onClick={() => setDeleting(true)}>Delete</Button>
    </li>
  )
}

export default DocumentsListItem;