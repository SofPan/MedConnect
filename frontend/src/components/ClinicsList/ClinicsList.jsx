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
  const mapClinics = DUMMY_CLINICS.map(clinic => {
    return <ClinicListItem 
              key={clinic.id} 
              id={clinic.id}
              name={clinic.name}
              address={clinic.address}
            />
  })

  return(
    <ul className="available-clinics">
      {mapClinics}
    </ul>
  )
}

export default ClinicList;