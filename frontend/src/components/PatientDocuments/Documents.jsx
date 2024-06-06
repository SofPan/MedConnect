import { useState, useEffect, useContext } from "react";
import { useGet } from "../../hooks/useAPI";
import UserSignedIn from '../GeneralComponents/UserSignedIn';

import DocumentsList from "../PatientDocuments/DocumentsList";
import AccordionWrapper from "../GeneralComponents/AccordionWrapper";
import NewDocument from "../PatientDocuments/NewDocument";
import { Box, Typography } from "@mui/material";


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
    <Box type="div" className="mt-8">
      <Typography variant="h3">Documents</Typography>
      <Box className="my-8">
        <AccordionWrapper title="Add">
          <NewDocument 
            patient_id={userProfile.id}  
          />
        </AccordionWrapper>
        <Box className="mt-8">
          <DocumentsList 
            patient_id={userProfile.id} 
            documents={documents}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default Documents;