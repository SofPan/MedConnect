import ClinicListItem from "./ClinicsListItem";

const DUMMY_CLINICS = [
  {
    id : 1,
    name: "WeFixU Clinic",
    address: "123 Cool Street, City, Country"
  },
  {
    id : 2,
    name: "Best MD",
    address: "42 Douglas Lane, City, Country"
  },
  {
    id : 3,
    name: "Sneezes R Us",
    address: "777 Luck Avenue, City, Country"
  }
]

const ClinicList = () => {
  return(
    <ul>
      <ClinicListItem />
    </ul>
  )
}

export default ClinicList;