import { useEffect, useState } from 'react';
import DocumentForm from '../Forms/DocumentForm';

const NewDocument = (props) => {
  const {patient_id, addDocument} = props;
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

  useEffect(() => {
    const createDocument = async () => {
      // await postDoctor(doctor);
    }

    if (document.name){
      createDocument();
      addDocument();
    } 
  }, [document, addDocument]);


  return(
    <>
      <DocumentForm handleSubmit={handleSubmit}/>
    </>
  )
}

export default NewDocument;