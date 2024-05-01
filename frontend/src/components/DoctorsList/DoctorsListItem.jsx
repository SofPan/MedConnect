const DoctorsListItem = (props) => {
  const {name, qualifications, photo, patients} = props;

  return(
    <li>
      {/* For Available Doctors page */}
      <span className="available_doctors">
        <p>{name} accepting {patients} patients </p>
      </span>
      {/* For Clinic Profile Page */}
      {/* <span className="roster">
        <div>
          <img src={photo} />
        </div>
        <div>    
          <p>{name} <br />
              Can accept {patients} more patients
          </p>
          <p> {qualifications} </p>
        </div>
        <div>
          <button>Edit</button>
          <button>Delete</button>
        </div>
      </span> */}
    </li>
  )
}

export default DoctorsListItem;