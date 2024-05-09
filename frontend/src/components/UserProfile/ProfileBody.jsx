import BoxWrapper from "../GeneralComponents/BoxWrapper";
import UserInformation from "./UserInformation";

const ProfileBody = (props) => {
  const {
    userProfile, 
    profileComponentLeft,
    profileComponentRight
  } = props;

  return(
    <article className="profile-main">
      <BoxWrapper type="profileLeft">
        <UserInformation userProfile={userProfile}/>
        {profileComponentLeft}
      </BoxWrapper>
      <BoxWrapper type="profileRight">
        {profileComponentRight}
      </BoxWrapper>
    </article>
  )
}

export default ProfileBody;