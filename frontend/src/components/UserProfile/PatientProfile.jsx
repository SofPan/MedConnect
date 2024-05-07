import { useState, useEffect } from "react";
import DocumentsList from "../PatientDocuments/DocumentsList";
import UserInformation from "./UserInformation";
import { fetchDocuments } from "../../hooks/tempUseAPI";
import AccordionWrapper from "../GeneralComponents/AccordionWrapper";
import NewDocument from "../PatientDocuments/NewDocument";
import { Box } from "@mui/material";
import PatientAppointments from "../Scheduling/PatientAppointments";

const PatientProfile = (props) => {
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
    <div className="patient-profile">
      <article className="profile-main">
        <Box className="profile-left" width="30%" display={'inline-block'}>
          <UserInformation userProfile={userProfile} />
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
        </Box>
        <Box className="profile-right" width="60%" height="100%" display={'inline-flex'} flexDirection={"column"} justifyContent={"flex-start"} marginLeft={"50px"}>
          <h2>Appointments</h2>
          <PatientAppointments patient_id={userProfile.id}/>
        </Box>
      </article>
    </div>
  )
}

export default PatientProfile;