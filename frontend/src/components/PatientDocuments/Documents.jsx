import { useState, useEffect, useContext } from "react";
import { useGet } from "../../hooks/useAPI";
import { UserSignedIn } from "../../App";

import AccordionWrapper from "../GeneralComponents/AccordionWrapper";
import NewDocument from "../PatientDocuments/NewDocument";
import List from "../List/List";
import DocumentsListItem from "../List/DocumentsListItem";
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

  const filterDocuments = documents.filter(document => {
    // Only show the Patient's documents
    return document.patient_id === userState.userInfo.user_id;
  });

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
          <List listItems={filterDocuments} ItemComponent={DocumentsListItem} />
        </Box>
      </Box>
    </Box>
  )
}

export default Documents;