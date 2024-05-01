import DoctorsListItem from "./DoctorsListItem";

const DUMMY_DOCTORS = [
  {
    id: 1,
    clinic_id: 1,
    name: "Dr. Medici",
    qualifications: "Very qualified, we promise",
    photo_url: "http://placekitten.com/100/100",
    number_of_patients: 4
  },
  {
    id: 2,
    clinic_id: 1,
    name: "Dr. Doom",
    qualifications: "Not a villain",
    photo_url: "http://placekitten.com/100/100",
    number_of_patients: 2
  },
  {
    id: 3,
    clinic_id: 1,
    name: "Dr. Who",
    qualifications: "Timey-Wimey Stuff",
    photo_url: "http://placekitten.com/100/100",
    number_of_patients: 0
  },
  {
    id: 4,
    clinic_id: 2,
    name: "Dr. Oldguy",
    qualifications: "Been around the block a few times",
    photo_url: "http://placekitten.com/100/100",
    number_of_patients: 4
  },
  {
    id: 5,
    clinic_id: 2,
    name: "Dr. Newbie",
    qualifications: "Fresh out of school!",
    photo_url: "http://placekitten.com/100/100",
    number_of_patients: 10
  },
  {
    id: 6,
    clinic_id: 3,
    name: "Dr. Mysterio",
    qualifications: "Who even is he?",
    photo_url: "http://placekitten.com/100/100",
    number_of_patients: 0
  }
]

const DoctorsList = ({clinic_id}) => {
  return(
    <ul>
      <DoctorsListItem />
    </ul>
  )
}

export default DoctorsList;