import { useEffect, useState } from 'react';
import { useDelete } from '../../hooks/useAPI';
import { Button } from '@mui/material';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';

const DocumentsListItem = (props) => {
  const {
    id,
    name,
  } = props;

  const [deleting, setDeleting] = useState(false);
  const {deleteLoading, deleteData, deleteRecord} = useDelete();


  useEffect(() => {
    deleting && deleteRecord(
      'documents',
      id
    )
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