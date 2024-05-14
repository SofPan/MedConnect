import { useContext, useEffect, useState } from 'react';
import { usePost } from '../../hooks/useAPI';
import DocumentForm from '../Forms/DocumentForm';
import { UserSignedIn } from '../../App';

const NewDocument = (props) => {
  const {patient_id} = props;

  const {dispatch} = useContext(UserSignedIn);
  const [document, setDocument] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const target = e.target.elements;
    setDocument({
      patient_id,
      document_name: target.name.value,
      document_url: target.document_url.value
    });
  }

  const {post} = usePost();

  useEffect(() => {
    if(document.document_name) {
      post(
        'documents',
        document
      );
      dispatch({type: "ADD_DOCUMENT", payload: document})
    }
  }, [document]);


  return(
    <>
      <DocumentForm handleSubmit={handleSubmit}/>
    </>
  )
}

export default NewDocument;