import { useState, useEffect, useContext } from "react";
import { useGet } from "../../hooks/useAPI";
import { UserSignedIn } from "../../App";

import DocumentsList from "../PatientDocuments/DocumentsList";
import AccordionWrapper from "../GeneralComponents/AccordionWrapper";
import NewDocument from "../PatientDocuments/NewDocument";
import { Box } from "@mui/material";


const Documents = (props) => {
  const {userProfile} = props;

  const {getData, get} = useGet()

  const {userState, dispatch} = useContext(UserSignedIn);

  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    documents.length !== userState.documents.length &&
    get(
      'documents'
    )
  }, [userState.documents]);

  useEffect(() => {
    if(getData){
      dispatch({ type: "SET_DOCUMENTS", payload: getData });
      setDocuments(getData);
    }
  }, [getData]);

  return(
    <Box type="div">
      <h2>Documents</h2>
      <AccordionWrapper title="Add">
        <NewDocument 
          patient_id={userProfile.id}  
        />
      </AccordionWrapper>
      <DocumentsList 
        patient_id={userProfile.id} 
        documents={documents}
      />
    </Box>
  )
}

export default Documents;