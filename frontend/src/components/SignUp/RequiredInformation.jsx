import { useContext } from "react";
import ClinicSignUpInfo from "./ClinicSignUpInfo";
import PatientInfo from "./PatientInfo";
import { UserSignedIn } from "../../App";

const RequiredInformation = () => {

  const { userState } = useContext(UserSignedIn);

  return (
    <>
    {userState.userInfo.is_clinic && <ClinicSignUpInfo />}
    {!userState.userInfo.is_clinic && <PatientInfo /> }
    </>
  )
}

export default RequiredInformation;