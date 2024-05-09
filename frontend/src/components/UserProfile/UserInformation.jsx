const UserInformation = (props) => {
  const {userProfile} = props;
  console.log("UserInformation", userProfile);
  const formatBirthDate = (date) => {
    return date.split("T").shift();
  }
  return(
    <div className='profile-information'>
      <h2>Information</h2>
      <div>
        <p>Name: {userProfile.name}</p>
        <p>{userProfile.address && `Address: ${userProfile.address}`}</p>
        <p> 
          {
            userProfile.date_of_birth && 
            `Date of Birth: ${formatBirthDate(userProfile.date_of_birth)}`
          }
          </p>
      </div>
      {/* <Button>Edit</Button> */}
    </div>
  )
}

export default UserInformation;