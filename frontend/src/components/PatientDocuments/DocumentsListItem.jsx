import { useContext, useEffect, useState } from 'react';
import { useDelete } from '../../hooks/useAPI';
import { Button } from '@mui/material';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import UserSignedIn from '../GeneralComponents/UserSignedIn';
import { Box } from '@mui/system';

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
      <Box className="flex items-center">
        <Box className="flex items-center mr-6">
          <DescriptionOutlinedIcon className="text-red-900 mr-1"/>
          <span>{name}</span>
        </Box>
        <Button variant="small" onClick={() => setDeleting(true)}>DELETE</Button>
      </Box>
    </li>
  )
}

export default DocumentsListItem;