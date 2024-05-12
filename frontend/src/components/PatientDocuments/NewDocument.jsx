import { useEffect, useState } from 'react';
import DocumentForm from '../Forms/DocumentForm';
import { usePost } from '../../hooks/useAPI';

const NewDocument = (props) => {
  const {patient_id} = props;
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

  const {responseLoading, responseData, post} = usePost();

  useEffect(() => {
    document.document_name && post(
      'documents',
      document
    );
  }, [document]);


  return(
    <>
      <DocumentForm handleSubmit={handleSubmit}/>
    </>
  )
}

export default NewDocument;