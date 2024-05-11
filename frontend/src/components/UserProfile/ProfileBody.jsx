import BoxWrapper from "../GeneralComponents/BoxWrapper";
import PatientScheduler from "../Scheduling/PatientScheduler";
import TabContent from "./TabContent";
import UserInformation from "./UserInformation";

const ProfileBody = (props) => {
  const {
    isClinic,
    userProfile, 
    profileComponentLeft,
    profileComponentRight,
    activeTab,
  } = props;

  return(
   
    <article className={`profile-main ${isClinic ? "clinic-profile" : "patient-profile"}`}>
      <TabContent value={activeTab} index={0}>
        <BoxWrapper type="profileLeft">
          <UserInformation userProfile={userProfile}/>
          {profileComponentLeft}
        </BoxWrapper>
        <BoxWrapper type="profileRight">
          {profileComponentRight}
        </BoxWrapper>
      </TabContent>
      <TabContent value={activeTab} index={1}>
        <PatientScheduler />
      </TabContent>
    </article>
  )
}

export default ProfileBody;