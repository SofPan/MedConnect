import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { Button } from '@mui/material';
import { deleteDocument } from '../../hooks/tempUseAPI';
import { useEffect, useState } from 'react';

const DocumentsListItem = (props) => {
  const {
    id,
    name,
    changeDocumentState
  } = props;

  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const deleteDocumentFromList = async () => {
      await deleteDocument(id);
    }

    if(deleting){
      deleteDocumentFromList();
      changeDocumentState();
    }
  }, [deleting, id, changeDocumentState])

  return(
    <li>
      <DescriptionOutlinedIcon/>
      <span>{name}</span>
      <Button onClick={() => setDeleting(true)}>Delete</Button>
    </li>
  )
}

export default DocumentsListItem;