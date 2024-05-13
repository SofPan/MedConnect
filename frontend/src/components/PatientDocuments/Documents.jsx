import { useState, useEffect } from "react";
import { useGet } from "../../hooks/useAPI";

import DocumentsList from "../PatientDocuments/DocumentsList";
import AccordionWrapper from "../GeneralComponents/AccordionWrapper";
import NewDocument from "../PatientDocuments/NewDocument";


const Documents = (props) => {
  const {userProfile} = props;
  // TODO: replace filtering in child component by calling the request by patient_id
  const {getData, get} = useGet()

  const [documents, setDocuments] = useState([]);
  const [alterDocuments, setAlterDocuments] = useState(0);

  useEffect(() => {
    get(
      'documents'
    )
    getData && setDocuments(getData);
  }, [getData]);

  const triggerDocumentStateUpdate = () => {
    setAlterDocuments(alterDocuments + 1);
  }

  return(
    <>
      <h2>Documents</h2>
      <AccordionWrapper title="Add">
        <NewDocument 
          patient_id={userProfile.id} 
          addDocument={triggerDocumentStateUpdate}  
        />
      </AccordionWrapper>
      <DocumentsList 
        patient_id={userProfile.id} 
        documents={documents}
        changeDocumentState={triggerDocumentStateUpdate}
      />
    </>
  )
}

export default Documents;