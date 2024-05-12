import { useEffect, useState } from 'react';
import { usePost } from '../../hooks/useAPI';
import DocumentForm from '../Forms/DocumentForm';

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

  const {postLoading, postData, post} = usePost();

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