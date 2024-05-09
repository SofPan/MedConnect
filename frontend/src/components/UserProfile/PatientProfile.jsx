import { useState, useEffect } from "react";
import DocumentsList from "../PatientDocuments/DocumentsList";
import UserInformation from "./UserInformation";
import { fetchDocuments } from "../../hooks/tempUseAPI";
import AccordionWrapper from "../GeneralComponents/AccordionWrapper";
import NewDocument from "../PatientDocuments/NewDocument";
import { Box } from "@mui/material";
import PatientAppointments from "../Scheduling/PatientAppointments";
import BoxWrapper from "../GeneralComponents/BoxWrapper";

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
        <BoxWrapper type="profileLeft">
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
        </BoxWrapper>
        <BoxWrapper type="profileRight">
          <h2>Appointments</h2>
          <PatientAppointments patient_id={userProfile.id}/>
        </BoxWrapper>
      </article>
    </div>
  )
}

export default PatientProfile;