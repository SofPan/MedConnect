import DocumentsListItem from "./DocumentsListItem";

const DocumentsList = (props) => {
  const {patient_id} = props;

  
  return(
    <ul>
      <DocumentsListItem />
    </ul>
  )
}

export default DocumentsList;