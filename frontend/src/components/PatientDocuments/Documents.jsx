import { useState, useEffect } from "react";
import { fetchDocuments } from "../../hooks/tempUseAPI";

import DocumentsList from "../PatientDocuments/DocumentsList";
import AccordionWrapper from "../GeneralComponents/AccordionWrapper";
import NewDocument from "../PatientDocuments/NewDocument";


const Documents = (props) => {
  const {userProfile} = props;

  const [documents, setDocuments] = useState([]);
  const [alterDocuments, setAlterDocuments] = useState(0);

  useEffect(() => {
    const fetchPatientDocuments = async () => {
      const documentData = await fetchDocuments();
      setDocuments(documentData);
    }

    fetchPatientDocuments();
  }, [alterDocuments]);

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