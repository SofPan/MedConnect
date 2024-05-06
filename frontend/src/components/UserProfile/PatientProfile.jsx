import { useState, useEffect } from "react";
import DocumentsList from "../PatientDocuments/DocumentsList";
import UserInformation from "./UserInformation";
import { fetchDocuments } from "../../hooks/tempUseAPI";

const PatientProfile = (props) => {
  const {userProfile} = props;

  const [documents, setDocuments] = useState([]);
  const [alterDocuments, setAlterDocuments] = useState(0);

  useEffect(() => {
    const fetchPatientDocuments = async () => {
      const doctorData = await fetchDocuments();
      setDocuments(doctorData);
    }

    fetchPatientDocuments();
  }, [alterDocuments]);

  const triggerDocumentStateUpdate = () => {
    setAlterDocuments(alterDocuments + 1);
  }

  return(
    <div className="patient-profile">
      <UserInformation userProfile={userProfile} />
      <h2>Documents</h2>
        <button>Add</button>
        <DocumentsList 
          patient_id={userProfile.id} 
          documents={documents}
          changeDocumentState={triggerDocumentStateUpdate}
        />
    </div>
  )
}

export default PatientProfile;