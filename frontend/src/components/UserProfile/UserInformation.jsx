const UserInformation = (props) => {
  const {userProfile} = props;
  return(
    <div className='profile-information'>
      <h2>Information</h2>
      <div>
        <p>{userProfile.name}</p>
        <p>{userProfile.address && userProfile.address}</p>
      </div>
      {/* <Button>Edit</Button> */}
    </div>
  )
}

export default UserInformation;